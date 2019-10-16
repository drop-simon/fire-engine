import UnitPathfindingService, {
  UnitCoordinates,
  Coordinates
} from "./UnitPathfindingService";
import { TerrainCreatorType, UnitType } from "../types";
import GameManagementService from "./GameManagementService";

export type MapConfigType = { terrain: TerrainCreatorType[][] };

export interface MapManagementServiceConstructor {
  map: MapConfigType;
  units: UnitCoordinates[];
  gameManager: GameManagementService;
}

export default class MapManagementService {
  map: MapConfigType;
  units: UnitCoordinates[];
  gameManager: GameManagementService;
  pathfinders: { [key: string]: UnitPathfindingService };

  constructor({ map, units, gameManager }: MapManagementServiceConstructor) {
    this.map = map;
    this.units = units;
    this.gameManager = gameManager;
    this.pathfinders = units.reduce(
      (acc, unitCoordinates) => {
        const pathfinder = new UnitPathfindingService({
          map: this.map,
          unitCoordinates,
          gameManager: this.gameManager
        });
        acc[unitCoordinates.unit.name] = pathfinder;
        return acc;
      },
      {} as { [key: string]: UnitPathfindingService }
    );
  }

  getTileAtCoordinates({ x, y }: Coordinates) {
    const terrainCreator = this.map.terrain[y][x];
    return terrainCreator({ base: { promotions: [], name: "" } } as UnitType);
  }

  addUnits(units: UnitCoordinates[]) {
    units.forEach(unitCoordinates => {
      const pathfinder = new UnitPathfindingService({
        map: this.map,
        unitCoordinates,
        gameManager: this.gameManager
      });
      this.pathfinders[unitCoordinates.unit.name] = pathfinder;
    });
    return this;
  }
}
