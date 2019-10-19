import Graph from "node-dijkstra";
import compact from "lodash/compact";
import range from "lodash/range";
import uniqBy from "lodash/uniqBy";
import { Unit, TerrainConfig, UnitAllegiance } from "../types";
import MapManagementService, {
  MapConfigType,
  MapTileInformation
} from "./MapManagementService";
import { getMapSize } from "./utils";
import GameManagementService from "./GameManagementService";
import UnitManagementService from "./BattleManagementService/UnitManagementService";

export type Coordinates = {
  x: number;
  y: number;
};

export type UnitCoordinates = {
  unit: Unit;
  coordinates: Coordinates;
  allegiance: UnitAllegiance;
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
        const tile = this.getTile({ x, y });
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

  getWalkableTiles() {
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
        this.getTile({ x: coordinates.x + x, y: coordinates.y + y })
      )
    );

  compareCoordinates(coordsA: Coordinates, coordsB: Coordinates) {
    return this.createTileKey(coordsA) === this.createTileKey(coordsB);
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
    const { width, height } = getMapSize(this.mapManager.map);
    const outOfBoundsX = x < 0 || x > width;
    const outOfBoundsY = y < 0 || y > height;
    return !(outOfBoundsX || outOfBoundsY);
  };

  private getTile({ x, y }: Coordinates) {
    return this.mapManager.getTileInfo({
      coordinates: { x, y },
      unit: this.unitManager.unit
    });
  }

  private createDijkstraNode = (coordinates: Coordinates) => {
    const tile = this.getTile(coordinates);
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
