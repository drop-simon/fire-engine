import { StatListType, UnitDependantFunction, Unit } from "../unit";
import { ItemBase } from "./item";
import BattleManagementService from "../../services/BattleManagementService";

export type ConsumableItemConfig = ItemBase & {
  effect?: {
    static?: Partial<StatListType>;
    permanent?: Partial<StatListType>;
    ongoing?: {
      [key in keyof StatListType]?: { amount: number; numTurns: number };
    };
    curesPoison?: boolean;
  };
};
