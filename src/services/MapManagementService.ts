import compact from "lodash/compact";
import UnitPathfindingService, { Coordinates } from "./UnitPathfindingService";
import { TerrainConfig, UnitAllegiance, Item } from "../types";
import GameManagementService from "./GameManagementService";
import { getMapDimensions } from "./utils";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import { UnitCoordinates } from "./BattleManagementService/UnitManagementService/UnitManagementService";
import EventEmitterService from "./EventEmitterService";
import ConflictProcessingService, {
  ConflictQueue
} from "./ConflictProcessingService";

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
  allegiance: UnitAllegiance;
};

type MapEvents = {
  moveUnit: (args: {
    unit: MapManagedUnit;
    path: MapTileInformation[];
  }) => void;
  pilferChest: (coordinates: Coordinates) => void;
  addUnits: (units: MapManagedUnit[]) => void;
  removeUnits: (units: MapManagedUnit[]) => void;
  unitUseItem: (args: { unit: MapManagedUnit; item: Item }) => void;
  conflict: (conflictQueue: ConflictQueue) => void;
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

  moveUnit = (unit: MapManagedUnit, path: MapTileInformation[]) =>
    this.emit("moveUnit", { path: unit.pathfinder.commitToPath(path), unit });

  pilferChest = (coordinates: Coordinates) =>
    this.emit("pilferChest", coordinates);

  unitUseItem = (unit: MapManagedUnit, item: Item) =>
    this.emit("unitUseItem", { item, unit });

  conflict = (config: {
    aggressor: MapManagedUnit;
    defender: MapManagedUnit;
  }) => {
    const conflictQueue = new ConflictProcessingService(config).process();
    this.emit("conflict", conflictQueue);
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
    const mapManagedUnit = {
      pathfinder,
      unitManager,
      allegiance: unitManager.allegiance
    };
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
