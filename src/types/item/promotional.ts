import { ItemBase } from "./item";
import { CombatCategory } from "./weapon";

export interface PromotionalItemConfig<C extends CombatCategory>
  extends ItemBase {}
