import UnitPathfindingService, {
  UnitCoordinates
} from "./UnitPathfindingService";
import { TerrainCreatorType } from "../types";

export type MapConfigType = { terrain: TerrainCreatorType[][] };

export type ConfiguredMapType = {
  map: MapConfigType & {
    size: { width: number; height: number };
  };
  units: UnitCoordinates[];
};

export interface MapManagementServiceConstructor {
  map: MapConfigType;
  units: UnitCoordinates[];
}

export default class MapManagementService {
  config: ConfiguredMapType;
  pathfinders: { [key: string]: UnitPathfindingService };
  pauseInteractions = false;

  constructor({ map, units }: MapManagementServiceConstructor) {
    this.config = {
      map: {
        ...map,
        size: {
          height: map.terrain.length - 1,
          width: map.terrain[0].length - 1
        }
      },
      units
    };
    this.pathfinders = units.reduce(
      (acc, unitCoordinates) => {
        const pathfinder = new UnitPathfindingService({
          config: this.config,
          unitCoordinates
        });
        acc[unitCoordinates.unit.name] = pathfinder;
        return acc;
      },
      {} as { [key: string]: UnitPathfindingService }
    );
  }
}
