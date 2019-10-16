import { WeaponConfigType, CombatCategoryType } from "./weapon";
import { ConsumableItemConfig } from "./consumable";
import { PromotionalItemConfig } from "./promotional";

export interface ItemBaseConfig {
  name: string;
  category: "Weapon" | "Consumable" | "Promotional" | "Other";
  maxUses: number;
  numUses: number;
  cost: number;
}
export type ItemType =
  | WeaponConfigType<CombatCategoryType>
  | ConsumableItemConfig
  | PromotionalItemConfig<CombatCategoryType>;
