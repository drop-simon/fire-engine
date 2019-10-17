import { ItemBaseConfig } from "./item";
import { Items } from "../../constants";

const CombatCategories = {
  Physical: "Physical",
  Magic: "Magic",
  Special: "Special"
} as const;

export type PhysicalWeaponSpecialty = "Swords" | "Lances" | "Axes" | "Bows";

export type MagicWeaponSpecialty = "Anima" | "Light" | "Dark" | "Staves";

export type SpecialWeaponSpecialty = "Ring" | "Instrument" | "None";

export type AnyWeaponSpecialty =
  | PhysicalWeaponSpecialty
  | MagicWeaponSpecialty
  | SpecialWeaponSpecialty;

export type WeaponSpecialty<C extends CombatCategory> = C extends "Magic"
  ? MagicWeaponSpecialty
  : C extends "Physical"
  ? PhysicalWeaponSpecialty
  : SpecialWeaponSpecialty;

export type WeaponLevelType = "S" | "A" | "B" | "C" | "D" | "E";

export type CombatCategory = keyof typeof CombatCategories;

export type WeaponEffectType = {
  static?: {
    power: number;
    weight: number;
    accuracy: number;
    critical: number;
  };
};

export interface WeaponConfigType<C extends CombatCategory>
  extends ItemBaseConfig {
  subcategory: C;
  name: string;
  specialty: WeaponSpecialty<C>;
  level: C extends "Special" ? null : WeaponLevelType;
  description?: string;
  effects?: WeaponEffectType;
  power: number;
  weight: number;
  accuracy: number;
  critical: number;
  experience: number;
  range: [number, number]; // min-max range, eg. [3,10] | [1,1]
}

export type PhysicalWeaponConfigType = WeaponConfigType<"Physical">;
export type MagicWeaponConfigType = WeaponConfigType<"Magic">;
export type SpecialWeaponConfigType = WeaponConfigType<"Special">;

export type WeaponNameType = keyof typeof Items["Weapons"];

export type WeaponType =
  | PhysicalWeaponConfigType
  | MagicWeaponConfigType
  | SpecialWeaponConfigType;
