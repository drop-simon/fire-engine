import { StatListType, UnitDependantFunction, Unit } from "../unit";
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
  getIsUseableInOverworld: UnitDependantFunction<boolean>;
  getIsUseableInBattle: (config: {
    unit: Unit;
    battleManager: BattleManagementService;
  }) => boolean;
};
