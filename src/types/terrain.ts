import { Terrain } from "../constants";
import { UnitDependantFunction } from ".";

export type TerrainCreator = UnitDependantFunction<{
  name: string;
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

export type Terrain = ReturnType<TerrainCreator>;
