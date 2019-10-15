import UnitPathfindingService, {
  UnitCoordinates
} from "./UnitPathfindingService";
import { TerrainCreatorType } from "../types";

export type MapConfigType = { terrain: TerrainCreatorType[][] };

export interface MapManagementServiceConstructor {
  map: MapConfigType;
  units: UnitCoordinates[];
}

export default class MapManagementService {
  map: MapConfigType;
  units: UnitCoordinates[];
  pathfinders: { [key: string]: UnitPathfindingService };
  pauseInteractions = false;

  constructor({ map, units }: MapManagementServiceConstructor) {
    this.map = map;
    this.units = units;
    this.pathfinders = units.reduce(
      (acc, unitCoordinates) => {
        const pathfinder = new UnitPathfindingService({
          map: this.map,
          unitCoordinates
        });
        acc[unitCoordinates.unit.name] = pathfinder;
        return acc;
      },
      {} as { [key: string]: UnitPathfindingService }
    );
  }

  addUnits(units: UnitCoordinates[]) {
    units.forEach(unitCoordinates => {
      const pathfinder = new UnitPathfindingService({
        map: this.map,
        unitCoordinates
      });
      this.pathfinders[unitCoordinates.unit.name] = pathfinder;
    });
    return this;
  }
}
