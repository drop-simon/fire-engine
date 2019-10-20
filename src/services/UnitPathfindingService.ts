import Graph from "node-dijkstra";
import compact from "lodash/compact";
import range from "lodash/range";
import uniqBy from "lodash/uniqBy";
import { TerrainConfig, UnitAllegiance, WeaponType, Unit } from "../types";
import MapManagementService, {
  MapTileInformation
} from "./MapManagementService";
import {
  getMapDimensions,
  getManhattanDistance,
  getTargetableTiles
} from "./utils";
import GameManagementService from "./GameManagementService";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import merge from "lodash/merge";

export type Coordinates = {
  x: number;
  y: number;
};

export interface TerrainWithKey extends TerrainConfig {
  key: string;
  coordinates: Coordinates;
}

const ADJACENT_TILE_INDICES = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 }
] as const;

type CommitToPath = (
  path: TerrainWithKey[],
  iterator?: (args: {
    tile: TerrainWithKey;
    index: number;
    next: () => void;
    abort: () => void;
  }) => any
) => Promise<void> | void;

type GetPathTo = (args: {
  start: Coordinates;
  end: Coordinates;
  uninterrupted?: boolean;
}) => MapTileInformation[];

export default class UnitPathfindingService {
  gameManager: GameManagementService;
  mapManager: MapManagementService;
  unitManager: UnitManagementService;
  allegiance: UnitAllegiance;
  currentCoordinates: Coordinates;
  processedTiles: MapTileInformation[] = [];
  tileMap = new Map<string, MapTileInformation>();
  graph = new Graph();

  constructor({
    mapManager,
    gameManager,
    coordinates,
    unitManager
  }: {
    gameManager: GameManagementService;
    mapManager: MapManagementService;
    unitManager: UnitManagementService;
    coordinates: Coordinates;
  }) {
    this.gameManager = gameManager;
    this.mapManager = mapManager;
    this.currentCoordinates = coordinates;
    this.unitManager = unitManager;

    mapManager.map.terrain.forEach((row, y) => {
      row.forEach((_, x) => {
        const node = this.createDijkstraNode({ x, y });
        const tile = this.getTileInfo({ coordinates: { x, y } });
        if (!node || !tile) {
          return;
        }
        this.tileMap.set(node.key, tile);
        this.graph.addNode(node.key, node.value);
        this.processedTiles.push(tile);
      });
    });
  }

  private get nonTraversableTiles() {
    return this.processedTiles
      .filter(tile => tile.terrain.calculated.movementCost === Infinity)
      .map(tile => tile.key);
  }

  getPathTo: GetPathTo = ({ start, end, uninterrupted = false }) => {
    const startKey = this.createTileKey(start);
    const endKey = this.createTileKey(end);
    const path: string[] | null = this.graph.path(startKey, endKey, {
      avoid: this.nonTraversableTiles
    });

    if (!path) {
      return [];
    }

    let stepsLeft = uninterrupted
      ? Infinity
      : this.unitManager.unit.stats.movement;

    const mappedPath = path.slice(1).reduce(
      (mappedPath, key) => {
        const node = this.tileMap.get(key);
        if (node.terrain.calculated.movementCost > stepsLeft) {
          stepsLeft = 0;
          return mappedPath;
        }
        stepsLeft -= node.terrain.calculated.movementCost;
        return mappedPath.concat(node);
      },
      [] as MapTileInformation[]
    );

    return mappedPath;
  };

  commitToPath: CommitToPath = (path, iterator) => {
    if (!iterator) {
      this.currentCoordinates = path[path.length - 1].coordinates;
      return;
    }

    return new Promise(resolve => {
      let shouldAbort = false;
      let index = -1;
      const abort = () => (shouldAbort = true);
      const next = () => {
        index++;
        if (shouldAbort || index === path.length) {
          this.currentCoordinates = path[index - 1].coordinates;
          resolve();
          return;
        }
        const tile = path[index];
        iterator({ tile, index, next, abort });
      };
      next();
    });
  };

  get walkableTiles() {
    const fullMovementRange = this.getFullMovementRange();
    const walkableTiles = fullMovementRange.reduce(
      (acc, coordinates) => {
        const endKey = this.createTileKey(coordinates);
        if (
          acc.some(tile => tile.key === endKey) ||
          this.nonTraversableTiles.includes(endKey)
        ) {
          return acc;
        }
        const path = this.getPathTo({
          start: this.currentCoordinates,
          end: coordinates
        });
        acc.push(...path);
        return acc;
      },
      [] as MapTileInformation[]
    );
    return uniqBy(walkableTiles, "key");
  }

  getAdjacentTiles = (coordinates: Coordinates) =>
    compact(
      ADJACENT_TILE_INDICES.map(({ x, y }) =>
        this.getTileInfo({
          coordinates: { x: coordinates.x + x, y: coordinates.y + y }
        })
      )
    );

  compareCoordinates(coordsA: Coordinates, coordsB: Coordinates) {
    return this.createTileKey(coordsA) === this.createTileKey(coordsB);
  }

  get conflictRange() {
    return this.getFullRangeFromWeapons(
      this.unitManager.equippableWeapons.filter(weapon => !weapon.friendly)
    );
  }

  get friendlyFireRange() {
    return this.getFullRangeFromWeapons(
      this.unitManager.equippableWeapons.filter(weapon => weapon.friendly)
    );
  }

  getFullRangeFromWeapons(weapons: WeaponType[]) {
    const tiles = weapons.reduce(
      (acc, weapon) => acc.concat(this.getFullRangeFromWeapon(weapon)),
      [] as MapTileInformation[]
    );
    return uniqBy(tiles, "key");
  }

  getFullRangeFromWeapon(weapon: WeaponType) {
    const [min, max] = weapon.range;
    const allTiles = this.getMapInfo(this.unitManager.unit);
    const targetableTiles = this.walkableTiles.reduce(
      (acc, currentTile) => {
        const tiles = getTargetableTiles({
          origin: currentTile,
          tiles: allTiles,
          weaponRange: [min, max]
        });
        return acc.concat(tiles);
      },
      [] as MapTileInformation[]
    );
    return uniqBy(targetableTiles, "key");
  }

  getRangeFromWeapon(weapon: WeaponType, tile: MapTileInformation) {
    const [min, max] = weapon.range;
    const allTiles = this.getMapInfo(this.unitManager.unit);
    return getTargetableTiles({
      origin: tile,
      tiles: allTiles,
      weaponRange: [min, max]
    });
  }

  getMapInfo(unit?: Unit) {
    return this.mapManager.map.terrain.reduce(
      (tiles, row, x) => {
        row.forEach((_, y) =>
          tiles.push(this.getTileInfo({ coordinates: { x, y } }))
        );
        return tiles;
      },
      [] as MapTileInformation[]
    );
  }

  private getFullMovementRange() {
    const { movement } = this.unitManager.unit.stats;
    const { currentCoordinates } = this;

    const coordinates = range(-movement, movement + 1).reduce(
      (coordinatesList, step) => {
        const x = currentCoordinates.x + step;
        const verticalRange = movement - Math.abs(step);

        let newCoordinates: Coordinates[] = [];
        for (let i = 0; i <= verticalRange; i++) {
          newCoordinates.push({ x, y: currentCoordinates.y + i });
          newCoordinates.push({ x, y: currentCoordinates.y - i });
        }
        coordinatesList.push(...newCoordinates.filter(this.isWithinBounds));
        return coordinatesList;
      },
      [currentCoordinates] as Coordinates[]
    );
    return uniqBy(coordinates, this.createTileKey);
  }

  private isWithinBounds = ({ x, y }: Coordinates) => {
    const { width, height } = getMapDimensions(this.mapManager.map);
    const outOfBoundsX = x < 0 || x > width;
    const outOfBoundsY = y < 0 || y > height;
    return !(outOfBoundsX || outOfBoundsY);
  };

  private getTileInfo({ coordinates: { x, y } }: { coordinates: Coordinates }) {
    const row = this.mapManager.map.terrain[y];
    if (!row) {
      return null;
    }
    const terrainConfig = row[x];
    if (!terrainConfig) {
      return null;
    }

    const { getUnitModifications, ...baseTerrain } = terrainConfig;
    const mapManagedUnit = this.mapManager.getUnitAtCoordinates({ x, y });

    return {
      terrain: {
        base: baseTerrain,
        calculated: mapManagedUnit
          ? merge(
              baseTerrain,
              getUnitModifications(mapManagedUnit.unitManager.unit)
            )
          : null
      },
      unit: mapManagedUnit,
      key: this.createTileKey({ x, y }),
      coordinates: { x, y }
    };
  }

  private createDijkstraNode = (coordinates: Coordinates) => {
    const tile = this.getTileInfo({ coordinates });
    if (!tile) {
      return null;
    }
    const adjacentTiles = this.getAdjacentTiles(coordinates);
    const dijkstraNode = {
      ...adjacentTiles.reduce(
        (acc, tile) => {
          acc[tile.key] = tile.terrain.calculated.movementCost;
          return acc;
        },
        {} as { [key: string]: number }
      )
    };
    return { value: dijkstraNode, key: tile.key };
  };

  private createTileKey = ({ x, y }: Coordinates) => `x:${x},y:${y}`;
}
