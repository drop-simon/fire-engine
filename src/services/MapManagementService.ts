import merge from "lodash/merge";
import UnitPathfindingService, {
  Coordinates,
  TerrainWithKey
} from "./UnitPathfindingService";
import { TerrainConfig, Unit, UnitAllegiance } from "../types";
import GameManagementService from "./GameManagementService";
import { getMapDimensions } from "./utils";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import { UnitCoordinates } from "./BattleManagementService/UnitManagementService/UnitManagementService";

export type MapConfigType = {
  terrain: TerrainConfig[][];
};

export type MapTileInformation = ReturnType<
  MapManagementService["getTileInfo"]
>;

export interface MapManagementServiceConstructor {
  map: MapConfigType;
  units: UnitCoordinates[];
  gameManager: GameManagementService;
}

export type MapManagedUnit = {
  unitManager: UnitManagementService;
  pathfinder: UnitPathfindingService;
};

export default class MapManagementService {
  map: MapConfigType & ReturnType<typeof getMapDimensions>;
  gameManager: GameManagementService;
  units: MapManagedUnit[] = [];
  chests: { coordinates: Coordinates; isOpened?: false }[] = [];

  constructor({ map, units, gameManager }: MapManagementServiceConstructor) {
    this.addUnits(units);
    this.map = { ...map, ...getMapDimensions(map) };
    this.gameManager = gameManager;
  }

  addUnit(unitCoordinates: UnitCoordinates) {
    const unitManager = new UnitManagementService({
      unitCoordinates,
      mapManager: this,
      gameManager: this.gameManager
    });
    const pathfinder = new UnitPathfindingService({
      unitManager,
      coordinates: unitCoordinates.coordinates,
      mapManager: this,
      gameManager: this.gameManager
    });
    this.units.push({ pathfinder, unitManager });
    return this;
  }

  addUnits(units: UnitCoordinates[]) {
    units.forEach(this.addUnit);
    return this;
  }

  get enemyUnits() {
    return this.units.filter(
      ({ unitManager }) => unitManager.allegiance === "ENEMY"
    );
  }

  get neutralUnits() {
    return this.units.filter(
      ({ unitManager }) => unitManager.allegiance === "NEUTRAL"
    );
  }

  get playerUnits() {
    return this.units.filter(
      ({ unitManager }) => unitManager.allegiance === "PLAYER"
    );
  }

  getUnitAtCoordinates(coordinates: Coordinates) {
    return this.units.find(({ pathfinder }) =>
      pathfinder.compareCoordinates(pathfinder.currentCoordinates, coordinates)
    );
  }

  getTileInfo({
    coordinates: { x, y },
    unit = undefined
  }: {
    coordinates: Coordinates;
    unit?: Unit;
  }) {
    const row = this.map.terrain[y];
    if (!row) {
      return null;
    }
    const terrainConfig = row[x];
    if (!terrainConfig) {
      return null;
    }

    const { getUnitModifications, ...baseTerrain } = terrainConfig;

    return {
      terrain: {
        base: baseTerrain,
        calculated: unit ? merge(baseTerrain, getUnitModifications(unit)) : null
      },
      unit,
      key: this.createTileKey({ x, y }),
      coordinates: { x, y }
    };
  }

  getMapTileInfo(unit?: Unit) {
    return this.map.terrain.reduce(
      (tiles, row, x) => {
        row.forEach((_, y) =>
          tiles.push(this.getTileInfo({ coordinates: { x, y }, unit }))
        );
        return tiles;
      },
      [] as MapTileInformation[]
    );
  }

  createTileKey = ({ x, y }: Coordinates) => `x:${x},y:${y}`;
}
