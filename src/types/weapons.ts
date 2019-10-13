import WEAPONS, { COMBAT_CATEGORIES } from "../constants/weapons";

export type PhysicalWeapon = "Swords" | "Lances" | "Axes" | "Bows";

export type MagicWeapon = "Anima" | "Light" | "Dark" | "Staves";

export type SpecialWeapon = "Ring" | "Instrument" | "None";

export type AnyWeapon = PhysicalWeapon | MagicWeapon | SpecialWeapon;

export type WeaponLevel = "S" | "A" | "B" | "C" | "D" | "E";

export type CombatCategory = keyof typeof COMBAT_CATEGORIES;

export type WeaponEffect = (
  weapon: Weapon
) => {
  power: number;
  weight: number;
  accuracy: number;
  critical: number;
};

export interface WeaponConfig<C extends CombatCategory> {
  category: C;
  type: C extends "MAGIC"
    ? MagicWeapon
    : C extends "PHYSICAL"
    ? PhysicalWeapon
    : SpecialWeapon;
  level: C extends "SPECIAL" ? null : WeaponLevel;
  description?: string;
  effects?: WeaponEffect;
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
export type PhysicalWeaponConfig = WeaponConfig<"PHYSICAL">;
export type MagicWeaponConfig = WeaponConfig<"MAGIC">;
export type SpecialWeaponConfig = WeaponConfig<"SPECIAL">;

export type WeaponName = keyof typeof WEAPONS;

export type Weapon = typeof WEAPONS[WeaponName];
