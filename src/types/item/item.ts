import { WeaponConfigType, CombatCategoryType } from "./weapon";
import { ConsumeableItemCreator } from "./consumable";
import { PromotionalItemConfig } from "./promotional";

export interface ItemBaseConfig {
  name: string;
  category: "Weapon" | "Consumeable" | "Promotional" | "Other";
  maxUses: number;
  numUses: number;
}
export type ItemType =
  | WeaponConfigType<CombatCategoryType>
  | ConsumeableItemCreator
  | PromotionalItemConfig<CombatCategoryType>;
