import Graph from "node-dijkstra";
import compact from "lodash/compact";
import uniqBy from "lodash/uniqBy";
import {
  TerrainConfig,
  UnitAllegiance,
  WeaponType,
  UnitBehavior
} from "../types";
import MapManagementService, {
  MapTileInformation
} from "./MapManagementService";
import { getManhattanDistance, getTargetableTiles } from "./utils";
import GameManagementService from "./GameManagementService";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import merge from "lodash/merge";
import { areUnitsAllied } from "./BattleManagementService/UnitManagementService/utils";
import UnitBehaviorService from "./BattleManagementService/UnitManagementService/UnitBehaviorService";

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

type GetPathTo = (args: {
  start?: Coordinates;
  end: Coordinates;
  uninterrupted?: boolean;
  graph?: Graph;
}) => MapTileInformation[];

type UnitPathfindingServiceConstructor = {
  gameManager: GameManagementService;
  mapManager: MapManagementService;
  unitManager: UnitManagementService;
  coordinates: Coordinates;
};

export default class UnitPathfindingService {
  gameManager: GameManagementService;
  mapManager: MapManagementService;
  unitManager: UnitManagementService;
  allegiance: UnitAllegiance;
  currentCoordinates: Coordinates;
  processedTiles: MapTileInformation[] = [];
  tileMap: { [key: string]: MapTileInformation } = {};
  graph = new Graph();

  constructor({
    mapManager,
    gameManager,
    coordinates,
    unitManager
  }: UnitPathfindingServiceConstructor) {
    this.gameManager = gameManager;
    this.mapManager = mapManager;
    this.currentCoordinates = coordinates;
    this.unitManager = unitManager;
    this.allegiance = unitManager.allegiance;

    this.mapManager.map.terrain.forEach((row, y) => {
      row.forEach((_, x) => {
        const node = this.createDijkstraNode({ x, y });
        const tile = this.getTileInfo({ x, y });
        if (!node || !tile) {
          return;
        }
        this.tileMap[node.key] = tile;
        this.graph.addNode(node.key, node.value);
        this.processedTiles.push(tile);
      });
    });
  }

  get walkableTiles() {
    const {
      currentCoordinates,
      unitManager: {
        calculatedStats: { movement }
      }
    } = this;

    const didCheck: { [key: string]: true } = {};
    return this.processedTiles.reduce(
      (acc, tile) => {
        if (didCheck[tile.key]) {
          return acc;
        }

        const distance = getManhattanDistance(
          tile.coordinates,
          currentCoordinates
        );
        if (distance > movement) {
          return acc;
        }

        const path = this.getPathTo({
          start: currentCoordinates,
          end: tile.coordinates,
          graph: this.movementRangeGraph
        });
        if (!path) {
          return acc;
        }

        path.forEach(tile => {
          if (!didCheck[tile.key]) {
            didCheck[tile.key] = true;
            acc.push(tile);
          }
        });

        return acc;
      },
      [] as MapTileInformation[]
    );
  }

  get friendlyFireTiles() {
    return this.getTargetableTiles({ friendly: true });
  }

  get attackableTiles() {
    return this.getTargetableTiles({ friendly: false });
  }

  getPathTo: GetPathTo = ({
    start = this.currentCoordinates,
    end,
    uninterrupted = false,
    graph = this.graph
  }) => {
    const startKey = this.createTileKey(start);
    const endKey = this.createTileKey(end);
    const path: string[] | null = graph.path(startKey, endKey, {
      avoid: this.nonTraversableTiles
    });

    if (!path) {
      return null;
    }

    let stepsLeft = uninterrupted
      ? Infinity
      : this.unitManager.calculatedStats.movement;

    const mappedPath = path.slice(1).reduce(
      (mappedPath, key) => {
        const node = this.tileMap[key];
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

  commitToPath = (path: MapTileInformation[]) => {
    // TODO: FOG OF WAR INTERRUPTING PATH
    this.currentCoordinates = path[path.length - 1].coordinates;
    this.emitMovement(path);
  };

  getAdjacentTiles = (coordinates: Coordinates) =>
    compact(
      ADJACENT_TILE_INDICES.map(({ x, y }) =>
        this.getTileInfo({ x: coordinates.x + x, y: coordinates.y + y })
      )
    );

  getTileInfo({ x, y }: Coordinates) {
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
        calculated: merge(
          baseTerrain,
          getUnitModifications(this.unitManager.unit)
        )
      },
      unit: mapManagedUnit,
      chest: this.mapManager.chests.find(({ coordinates }) =>
        this.compareCoordinates(coordinates, { x, y })
      ),
      key: this.createTileKey({ x, y }),
      coordinates: { x, y }
    };
  }

  compareCoordinates = (coordsA: Coordinates, coordsB: Coordinates) =>
    this.createTileKey(coordsA) === this.createTileKey(coordsB);

  private emitMovement(path: MapTileInformation[]) {
    this.mapManager.emit("moveUnit", { path, unit: this.unitManager });
  }

  private getTargetableTiles({ friendly }: { friendly: boolean }) {
    const conflictRanges = this.unitManager[
      friendly ? "supportRanges" : "attackRanges"
    ];
    if (conflictRanges.length < 1) {
      return [];
    }

    const { walkableTiles } = this;
    const targetableTiles = this.processedTiles.filter(processedTile =>
      walkableTiles.some(walkableTile => {
        const distance = getManhattanDistance(
          processedTile.coordinates,
          walkableTile.coordinates
        );

        return conflictRanges.some(
          ([min, max]) => distance >= min && distance <= max
        );
      })
    );

    return targetableTiles;
  }

  private get nonTraversableTiles() {
    return this.processedTiles
      .filter(tile => {
        if (tile.terrain.calculated.movementCost === Infinity) {
          return false;
        }

        if (
          tile.unit &&
          !areUnitsAllied(this.unitManager, tile.unit.unitManager)
        ) {
          return true;
        }
      })
      .map(tile => tile.key);
  }

  private get movementRangeGraph() {
    return this.processedTiles.reduce((graph, tile) => {
      const distance = getManhattanDistance(
        this.currentCoordinates,
        tile.coordinates
      );
      if (distance <= this.unitManager.calculatedStats.movement) {
        const node = this.createDijkstraNode(tile.coordinates);
        if (node) {
          graph.addNode(node.key, node.value);
        }
      }
      return graph;
    }, new Graph());
  }

  private createTileKey = ({ x, y }: Coordinates) => `{"x":${x},"y":${y}}`;

  private createDijkstraNode = (coordinates: Coordinates) => {
    const tile = this.getTileInfo(coordinates);
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
}
