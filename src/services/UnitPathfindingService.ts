import merge from "lodash/merge";
import range from "lodash/range";
import Graph from "node-dijkstra";
import compact from "lodash/compact";
import { TerrainConfig, UnitAllegiance } from "../types";
import MapManagementService, {
  MapTileInformation,
  MapManagedUnit
} from "./MapManagementService";
import { getManhattanDistance } from "./utils";
import GameManagementService from "./GameManagementService";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import { areUnitsAllied } from "./BattleManagementService/UnitManagementService/utils";

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
  currentCoordinates: Coordinates;
  processedTiles: MapTileInformation[] = [];
  tileMap: { [key: string]: MapTileInformation } = {};
  graph = new Graph();
  unitManager: UnitManagementService;
  allegiance: UnitAllegiance;

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

  get enemyUnits() {
    return this.mapManager.units.filter(
      unit => !areUnitsAllied(unit.unitManager, this.unitManager)
    );
  }

  get alliedUnits() {
    return this.mapManager.units.filter(unit =>
      areUnitsAllied(unit.unitManager, this.unitManager)
    );
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

  get attackRange() {
    const checkedTiles: { [key: string]: true } = {};
    return this.walkableTiles.reduce(
      (acc, tile) => {
        const key = this.createTileKey(tile.coordinates);
        if (checkedTiles[key]) {
          return acc;
        }
      },
      [] as MapTileInformation[]
    );
  }

  get nearestEnemy() {
    return this.enemyUnits.reduce(
      (acc, unit) => {
        if (!acc) {
          return unit;
        }

        const distanceFromUnit = getManhattanDistance(
          unit.pathfinder.currentCoordinates,
          this.currentCoordinates
        );
        const distanceFromNearest = getManhattanDistance(
          acc.pathfinder.currentCoordinates,
          this.currentCoordinates
        );
        if (distanceFromUnit < distanceFromNearest) {
          return unit;
        }

        return acc;
      },
      null as MapManagedUnit
    );
  }

  getAttackableTilesFromCoordinates(coordinates: Coordinates) {
    const { attackRanges } = this.unitManager;

    return attackRanges.reduce(
      (acc, [min, max]) => {
        range(min, max + 1).forEach(distance => {
          const addX = coordinates.x + distance;
          const addY = coordinates.y + distance;
          const subX = coordinates.x - distance;
          const subY = coordinates.y - distance;

          const updates = compact(
            [
              { x: addX, y: addY },
              { x: addX, y: subY },
              { x: subX, y: addY },
              { x: subX, y: subY }
            ].map(this.getTileInfo)
          );

          acc.push(...updates);
        });
        return acc;
      },
      [] as MapTileInformation[]
    );
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
    const calculatedPath = path;
    this.currentCoordinates = path[path.length - 1].coordinates;
    return calculatedPath;
  };

  getAdjacentTiles = (coordinates: Coordinates) =>
    compact(
      ADJACENT_TILE_INDICES.map(({ x, y }) =>
        this.getTileInfo({ x: coordinates.x + x, y: coordinates.y + y })
      )
    );

  getTileInfo = ({ x, y }: Coordinates) => {
    const row = this.mapManager.map.terrain[y];
    if (!row) {
      return null;
    }
    const terrainConfig = row[x];
    if (!terrainConfig) {
      return null;
    }

    const { getUnitModifications, ...baseTerrain } = terrainConfig;
    const getUnit = (coords: Coordinates) =>
      this.mapManager.getUnitAtCoordinates(coords);

    return {
      terrain: {
        base: baseTerrain,
        calculated: merge(
          baseTerrain,
          getUnitModifications(this.unitManager.unit)
        )
      },
      get unit() {
        return getUnit({ x, y });
      },
      chest: this.mapManager.chests.find(({ coordinates }) =>
        this.compareCoordinates(coordinates, { x, y })
      ),
      key: this.createTileKey({ x, y }),
      coordinates: { x, y }
    };
  };

  compareCoordinates = (coordsA: Coordinates, coordsB: Coordinates) =>
    this.createTileKey(coordsA) === this.createTileKey(coordsB);

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
