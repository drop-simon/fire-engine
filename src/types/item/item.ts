import { WeaponType } from "./weapon";
export interface ItemBaseConfig {
  name: string;
  category: "Weapon" | "Consumeable" | "Promotional" | "Other";
  maxUses: number;
  numUses: number;
}

export type ItemType = WeaponType;
