import { Terrain } from "../constants";
import { UnitDependantFunctionType } from ".";

export type TerrainNameType = keyof typeof Terrain;

export type TerrainCreatorType = UnitDependantFunctionType<{
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

export type TerrainType = ReturnType<TerrainCreatorType>;
