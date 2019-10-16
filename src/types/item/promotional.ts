import { ItemBaseConfig } from "./item";
import { CombatCategoryType } from "./weapon";
import { UnitClassConfigType } from "../unit";

export interface PromotionalItemConfig<C extends CombatCategoryType>
  extends ItemBaseConfig {
  name: string;
  applicableUnits: UnitClassConfigType<C>[];
}
