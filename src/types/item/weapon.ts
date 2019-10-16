import { ItemBaseConfig } from "./item";
import { Items } from "../../constants";

const CombatCategories = {
  Physical: "Physical",
  Magic: "Magic",
  Special: "Special"
} as const;

export type PhysicalWeaponSpecialtyType = "Swords" | "Lances" | "Axes" | "Bows";

export type MagicWeaponSpecialtyType = "Anima" | "Light" | "Dark" | "Staves";

export type SpecialWeaponSpecialtyType = "Ring" | "Instrument" | "None";

export type AnyWeaponSpecialtyType =
  | PhysicalWeaponSpecialtyType
  | MagicWeaponSpecialtyType
  | SpecialWeaponSpecialtyType;

export type WeaponSpecialtyType<
  C extends CombatCategoryType
> = C extends "Magic"
  ? MagicWeaponSpecialtyType
  : C extends "Physical"
  ? PhysicalWeaponSpecialtyType
  : SpecialWeaponSpecialtyType;

export type WeaponLevelType = "S" | "A" | "B" | "C" | "D" | "E";

export type CombatCategoryType = keyof typeof CombatCategories;

export type WeaponEffectType = {
  static?: {
    power: number;
    weight: number;
    accuracy: number;
    critical: number;
  };
};

export interface WeaponConfigType<C extends CombatCategoryType>
  extends ItemBaseConfig {
  subcategory: C;
  name: string;
  specialty: WeaponSpecialtyType<C>;
  level: C extends "Special" ? null : WeaponLevelType;
  description?: string;
  effects?: WeaponEffectType;
  power: number;
  weight: number;
  accuracy: number;
  critical: number;
  experience: number;
  range: [number, number]; // min-max range, eg. [3,10] | [1,1]
  cost?: number;
}

export type PhysicalWeaponConfigType = WeaponConfigType<"Physical">;
export type MagicWeaponConfigType = WeaponConfigType<"Magic">;
export type SpecialWeaponConfigType = WeaponConfigType<"Special">;

export type WeaponNameType = keyof typeof Items["Weapons"];

export type WeaponType = typeof Items["Weapons"][WeaponNameType];
