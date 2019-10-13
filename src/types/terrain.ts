import Terrain from "../constants/terrain";
import { UnitDependantFunction } from ".";

export type TerrainName = keyof typeof Terrain;

export type TerrainCreator = UnitDependantFunction<{
  movementCost: number;
  effects: {
    static: {
      defense: number;
      avoid: number;
    };
    ongoing: {
      health: number;
    };
  };
}>;

export type TerrainType = ReturnType<TerrainCreator>;
