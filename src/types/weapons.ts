import { Weapons, CombatCategories } from "../constants";

export type PhysicalWeaponType = "Swords" | "Lances" | "Axes" | "Bows";

export type MagicWeaponType = "Anima" | "Light" | "Dark" | "Staves";

export type SpecialWeaponType = "Ring" | "Instrument" | "None";

export type AnyWeaponType =
  | PhysicalWeaponType
  | MagicWeaponType
  | SpecialWeaponType;

export type WeaponLevelType = "S" | "A" | "B" | "C" | "D" | "E";

export type CombatCategoryType = keyof typeof CombatCategories;

export type WeaponEffectType = (
  weapon: WeaponType
) => {
  power: number;
  weight: number;
  accuracy: number;
  critical: number;
};

export interface WeaponConfigType<C extends CombatCategoryType> {
  category: C;
  name: string;
  type: C extends "Magic"
    ? MagicWeaponType
    : C extends "Physical"
    ? PhysicalWeaponType
    : SpecialWeaponType;
  level: C extends "Special" ? null : WeaponLevelType;
  description?: string;
  effects?: WeaponEffectType;
  power: number;
  weight: number;
  accuracy: number;
  critical: number;
  maxUses: number;
  numUses: number;
  experience: number;
  range: [number, number];
  cost?: number;
}
export type PhysicalWeaponConfigType = WeaponConfigType<"Physical">;
export type MagicWeaponConfigType = WeaponConfigType<"Magic">;
export type SpecialWeaponConfigType = WeaponConfigType<"Special">;

export type WeaponNameType = keyof typeof Weapons;

export type WeaponType = typeof Weapons[WeaponNameType];
