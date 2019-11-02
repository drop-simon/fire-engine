import compact from "lodash/compact";
import UnitPathfindingService, {
  Coordinates,
  TerrainWithKey
} from "./UnitPathfindingService";
import { TerrainConfig } from "../types";
import GameManagementService from "./GameManagementService";
import { getMapDimensions } from "./utils";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import { UnitCoordinates } from "./BattleManagementService/UnitManagementService/UnitManagementService";
import EventEmitterService from "./EventEmitterService";

export type MapTileInformation = ReturnType<
  UnitPathfindingService["getTileInfo"]
>;

export type MapTerrain = TerrainConfig[][];

export interface MapManagementServiceConstructor {
  terrain: MapTerrain;
  gameManager: GameManagementService;
}

export type MapManagedUnit = {
  unitManager: UnitManagementService;
  pathfinder: UnitPathfindingService;
};

type MapEvents = {
  moveUnit: (args: {
    unit: UnitManagementService;
    path: MapTileInformation[];
  }) => void;
  addUnits: (units: MapManagedUnit[]) => void;
  removeUnits: (units: MapManagedUnit[]) => void;
};

export default class MapManagementService extends EventEmitterService<
  MapEvents
> {
  map: { terrain: MapTerrain } & ReturnType<typeof getMapDimensions>;
  gameManager: GameManagementService;
  units: MapManagedUnit[] = [];
  chests: { coordinates: Coordinates; isOpened?: false }[] = [];

  constructor({ terrain, gameManager }: MapManagementServiceConstructor) {
    super();
    this.map = { terrain, ...getMapDimensions(terrain) };
    this.gameManager = gameManager;
  }

  addUnits = (units: UnitCoordinates[]) => {
    const addedUnits = compact(units.map(unit => this.addUnit(unit)));
    this.emit("addUnits", addedUnits);
    return this;
  };

  removeUnits = (coordinates: Coordinates[]) => {
    const removedUnits = compact(
      coordinates.map(coordinates => this.removeUnit(coordinates))
    );
    this.emit("removeUnits", removedUnits);
    return this;
  };

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

  getUnitAtCoordinates = (coordinates: Coordinates) => {
    return this.units.find(({ pathfinder }) =>
      pathfinder.compareCoordinates(pathfinder.currentCoordinates, coordinates)
    );
  };

  private addUnit = (unitCoordinates: UnitCoordinates) => {
    const unitExistsAtCoords = !!this.getUnitAtCoordinates(
      unitCoordinates.coordinates
    );
    if (unitExistsAtCoords) {
      return null;
    }

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
    const mapManagedUnit = { pathfinder, unitManager };
    this.units.push(mapManagedUnit);
    return mapManagedUnit;
  };

  private removeUnit = (coordinates: Coordinates) => {
    const mapManagedUnit = this.getUnitAtCoordinates(coordinates);
    if (!mapManagedUnit) {
      return null;
    }

    this.units = this.units.filter(
      ({ pathfinder: { currentCoordinates, compareCoordinates } }) =>
        compareCoordinates(currentCoordinates, coordinates)
    );

    return mapManagedUnit;
  };
}
