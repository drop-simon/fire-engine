import { ItemBaseConfig } from "./item";
import { UnitClassConfigType } from "../unit";
import { CombatCategoryType } from "./weapon";

export interface PromotionalItemConfig<C extends CombatCategoryType>
  extends ItemBaseConfig {
  name: string;
  promotions: { from: UnitClassConfigType<C>; to: UnitClassConfigType<C>[] }[];
}
