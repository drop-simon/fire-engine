import { StatListType, UnitDependantFunctionType } from "../unit";
import { ItemBaseConfig } from "./item";
import BattleManagementService from "../../services/BattleManagementService";

export type ConsumeableItemCreator = UnitDependantFunctionType<
  ItemBaseConfig & {
    effect: Partial<StatListType>;
    getIsUseableInOverworld: boolean;
    getIsUseableInBattle: (battleManager: BattleManagementService) => boolean;
  }
>;
