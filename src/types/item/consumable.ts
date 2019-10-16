import { StatListType, UnitDependantFunctionType } from "../unit";
import { ItemBaseConfig } from "./item";
import BattleManagementService from "../../services/BattleManagementService";

export type ConsumeableItemType = UnitDependantFunctionType<
  ItemBaseConfig & {
    effect: Partial<StatListType>;
    getIsUseableInOverworld: boolean;
    getIsUseableInBattle: (battleManager: BattleManagementService) => boolean;
  }
>;
