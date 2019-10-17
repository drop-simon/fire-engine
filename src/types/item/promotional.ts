import { ItemBaseConfig } from "./item";
import { CombatCategory } from "./weapon";
import { UnitClassConfig } from "../unit";

export interface PromotionalItemConfig<C extends CombatCategory>
  extends ItemBaseConfig {
  name: string;
  applicableUnits: UnitClassConfig<C>[];
}
