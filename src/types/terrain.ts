import { UnitDependantFunction } from ".";
import { DeepPartial } from "./util";

type TerrainBase = {
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
};

export type TerrainConfig = TerrainBase & {
  getUnitModifications: UnitDependantFunction<DeepPartial<TerrainBase>>;
};
