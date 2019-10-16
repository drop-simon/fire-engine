import Graph from "node-dijkstra";
import compact from "lodash/compact";
import range from "lodash/range";
import uniqBy from "lodash/uniqBy";
import { UnitType, TerrainType } from "../types";
import { MapConfigType } from "./MapManagementService";
import { getMapSize } from "./utils";
import GameManagementService from "./GameManagementService";

export type Coordinates = {
  x: number;
  y: number;
};

export type UnitCoordinates = {
  unit: UnitType;
  coordinates: Coordinates;
};

export interface TerrainWithKey extends TerrainType {
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
}) => TerrainWithKey[];

export default class UnitPathfindingService {
  gameManager: GameManagementService;
  map: MapConfigType;
  unit: UnitType;
  currentCoordinates: Coordinates;
  processedTiles: TerrainWithKey[] = [];
  tileMap = new Map<string, TerrainWithKey>();
  graph = new Graph();

  constructor({
    gameManager,
    unitCoordinates,
    map
  }: {
    gameManager: GameManagementService;
    unitCoordinates: UnitCoordinates;
    map: MapConfigType;
  }) {
    this.gameManager = gameManager;
    this.currentCoordinates = unitCoordinates.coordinates;
    this.unit = unitCoordinates.unit;
    this.map = map;

    map.terrain.forEach((row, y) => {
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
      .filter(tile => tile.movementCost === Infinity)
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

    let stepsLeft = uninterrupted ? Infinity : this.unit.stats.movement;

    const mappedPath = path.slice(1).reduce(
      (mappedPath, key) => {
        const node = this.tileMap.get(key);
        if (node.movementCost > stepsLeft) {
          stepsLeft = 0;
          return mappedPath;
        }
        stepsLeft -= node.movementCost;
        return mappedPath.concat(node);
      },
      [] as TerrainWithKey[]
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
      [] as TerrainWithKey[]
    );
    return uniqBy(walkableTiles, "key");
  }

  getAdjacentTiles = (coordinates: Coordinates) =>
    compact(
      ADJACENT_TILE_INDICES.map(({ x, y }) =>
        this.getTile({ x: coordinates.x + x, y: coordinates.y + y })
      )
    );

  private getFullMovementRange() {
    const { movement } = this.unit.stats;
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
    const { width, height } = getMapSize(this.map);
    const outOfBoundsX = x < 0 || x > width;
    const outOfBoundsY = y < 0 || y > height;
    return !(outOfBoundsX || outOfBoundsY);
  };

  private getTile({ x, y }: Coordinates): TerrainWithKey {
    const row = this.map.terrain[y];
    if (!row) {
      return null;
    }
    const terrainCreator = row[x];
    if (!terrainCreator) {
      return null;
    }
    return {
      ...terrainCreator(this.unit),
      key: this.createTileKey({ x, y }),
      coordinates: { x, y }
    };
  }

  createTileKey = ({ x, y }: Coordinates) => `x:${x},y:${y}`;

  private createDijkstraNode = (coordinates: Coordinates) => {
    const tile = this.getTile(coordinates);
    if (!tile) {
      return null;
    }
    const adjacentTiles = this.getAdjacentTiles(coordinates);
    const dijkstraNode = {
      ...adjacentTiles.reduce(
        (acc, tile) => {
          acc[tile.key] = tile.movementCost;
          return acc;
        },
        {} as { [key: string]: number }
      )
    };
    return { value: dijkstraNode, key: tile.key };
  };
}
