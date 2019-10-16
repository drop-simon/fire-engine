import { StatListType, UnitDependantFunctionType, UnitType } from "../unit";
import { ItemBaseConfig } from "./item";
import BattleManagementService from "../../services/BattleManagementService";

export type ConsumableItemConfig = ItemBaseConfig & {
  effect?: {
    static?: Partial<StatListType>;
    permanent?: Partial<StatListType>;
    ongoing?: {
      [key in keyof StatListType]?: { amount: number; numTurns: number };
    };
    curesPoison?: boolean;
  };
  getIsUseableInOverworld: UnitDependantFunctionType<boolean>;
  getIsUseableInBattle: (config: {
    unit: UnitType;
    battleManager: BattleManagementService;
  }) => boolean;
};
