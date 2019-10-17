import { WeaponConfigType, CombatCategory } from "./weapon";
import { ConsumableItemConfig } from "./consumable";
import { PromotionalItemConfig } from "./promotional";

type ItemCategoryType = "Weapon" | "Consumable" | "Promotional" | "Other";

export interface ItemBaseConfig {
  category: ItemCategoryType;
  name: string;
  maxUses: number;
  numUses: number;
  cost: number;
}
export type Item =
  | WeaponConfigType<CombatCategory>
  | PromotionalItemConfig<CombatCategory>
  | ConsumableItemConfig;
