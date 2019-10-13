import Graph from "node-dijkstra";
import compact from "lodash/compact";
import range from "lodash/range";
import uniqBy from "lodash/uniqBy";
import TerrainTypes from "../constants/terrain";
export const TILES = {
    D: TerrainTypes.Desert,
    G: TerrainTypes.Gate,
    I: TerrainTypes.Pillar,
    N: TerrainTypes.Plain,
    R: TerrainTypes.Floor,
    K: TerrainTypes.Thicket,
    P: TerrainTypes.Peak,
    F: TerrainTypes.Forest,
    S: TerrainTypes.Sea,
    T: TerrainTypes.Throne,
    W: TerrainTypes.Wall,
    C: TerrainTypes.Chest,
    V: TerrainTypes.Void,
    A: TerrainTypes.Gap
};
const ADJACENT_TILE_INDICES = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 }
];
export default class UnitPathfindingService {
    constructor({ chapter, unit, coordinates }) {
        this.processedTiles = [];
        this.tileMap = new Map();
        this.graph = new Graph();
        this.getPathTo = ({ start, end, uninterrupted = false }) => {
            const startKey = this.createTileKey(start);
            const endKey = this.createTileKey(end);
            const path = this.graph.path(startKey, endKey, {
                avoid: this.nonTraversableTiles
            });
            if (!path) {
                return [];
            }
            let stepsLeft = uninterrupted ? Infinity : this.unit.stats.movement;
            const mappedPath = path.slice(1).reduce((mappedPath, key) => {
                const node = this.tileMap.get(key);
                if (node.movementCost > stepsLeft) {
                    stepsLeft = 0;
                    return mappedPath;
                }
                stepsLeft -= node.movementCost;
                return mappedPath.concat(node);
            }, []);
            return mappedPath;
        };
        this.commitToPath = (path, iterator) => {
            if (!iterator) {
                this.currentCoordinates = path[path.length - 1].coordinates;
                return;
            }
            let shouldAbort = false;
            let index = -1;
            const abort = () => (shouldAbort = true);
            const next = () => {
                index++;
                if (shouldAbort || index === path.length) {
                    this.currentCoordinates = path[index - 1].coordinates;
                    return;
                }
                const tile = path[index];
                iterator({ tile, index, next, abort });
            };
            next();
        };
        this.getAdjacentTiles = (coordinates) => compact(ADJACENT_TILE_INDICES.map(({ x, y }) => this.getTile({ x: coordinates.x + x, y: coordinates.y + y })));
        this.isWithinBounds = ({ x, y }) => {
            const { width, height } = this.chapter.size;
            const outOfBoundsX = x < 0 || x > width;
            const outOfBoundsY = y < 0 || y > height;
            return !(outOfBoundsX || outOfBoundsY);
        };
        this.createTileKey = ({ x, y }) => `x:${x},y:${y}`;
        this.createDijkstraNode = (coordinates) => {
            const tile = this.getTile(coordinates);
            if (!tile) {
                return null;
            }
            const adjacentTiles = this.getAdjacentTiles(coordinates);
            const dijkstraNode = {
                ...adjacentTiles.reduce((acc, tile) => {
                    acc[tile.key] = tile.movementCost;
                    return acc;
                }, {})
            };
            return { value: dijkstraNode, key: tile.key };
        };
        this.chapter = chapter;
        this.unit = unit;
        this.currentCoordinates = coordinates;
        chapter.map.terrain.forEach((row, y) => {
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
    get nonTraversableTiles() {
        return this.processedTiles
            .filter(tile => tile.movementCost === Infinity)
            .map(tile => tile.key);
    }
    getWalkableTiles() {
        const fullMovementRange = this.getFullMovementRange();
        const walkableTiles = fullMovementRange.reduce((acc, coordinates) => {
            const endKey = this.createTileKey(coordinates);
            if (acc.some(tile => tile.key === endKey) ||
                this.nonTraversableTiles.includes(endKey)) {
                return acc;
            }
            const path = this.getPathTo({
                start: this.currentCoordinates,
                end: coordinates
            });
            acc.push(...path);
            return acc;
        }, []);
        return uniqBy(walkableTiles, "key");
    }
    getFullMovementRange() {
        const { movement } = this.unit.stats;
        const { currentCoordinates } = this;
        const coordinates = range(-movement, movement + 1).reduce((coordinatesList, step) => {
            const x = currentCoordinates.x + step;
            const verticalRange = movement - Math.abs(step);
            let newCoordinates = [];
            for (let i = 0; i <= verticalRange; i++) {
                newCoordinates.push({ x, y: currentCoordinates.y + i });
                newCoordinates.push({ x, y: currentCoordinates.y - i });
            }
            coordinatesList.push(...newCoordinates.filter(this.isWithinBounds));
            return coordinatesList;
        }, [currentCoordinates]);
        return uniqBy(coordinates, this.createTileKey);
    }
    getTile({ x, y }) {
        const { map } = this.chapter;
        const row = map.terrain[y];
        if (!row) {
            return null;
        }
        const tile = row[x];
        if (!tile) {
            return null;
        }
        const terrainCreator = TILES[tile];
        if (!terrainCreator) {
            return null;
        }
        return {
            ...terrainCreator(this.unit),
            key: this.createTileKey({ x, y }),
            coordinates: { x, y }
        };
    }
}
//# sourceMappingURL=UnitPathfindingService.js.map