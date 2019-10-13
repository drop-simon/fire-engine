import {
  PhysicalWeapon,
  MagicWeapon,
  SpecialWeapon,
  WeaponLevel,
  SupportDialogue,
  SupportLevel,
  BirthMonth,
  BloodType
} from ".";
import { Item } from "./item";
import { Affinities } from "../constants";
import UNITS from "../constants/units";
import UnitCreationService from "../services/UnitCreationService";
import UnitManagementService from "../services/UnitManagementService";
import { CombatCategory } from "./weapons";

export type UnitAffinity = keyof typeof Affinities;

export type SupportLevel = "A" | "B" | "C";

export type SupportDialogue = {
  character: string;
  angry?: boolean;
  text: string;
}[];

export type PhysicalUnitType =
  | "Archer"
  | "Assassin"
  | "Berserker"
  | "Brigand"
  | "Cavalier"
  | "Falcoknight"
  | "Fighter"
  | "General"
  | "Great Knight"
  | "Great Lady"
  | "Great Lord"
  | "Hero"
  | "Journeyman"
  | "Knight"
  | "Lady"
  | "Lord"
  | "Mercenary"
  | "Myrmidon"
  | "Paladin"
  | "Pegasus Knight"
  | "Pirate"
  | "Ranger"
  | "Rogue"
  | "Sniper"
  | "Soldier"
  | "Swordmaster"
  | "Theif"
  | "Recruit"
  | "Warrior"
  | "Wyvern Knight"
  | "Wyvern Lord"
  | "Wyvern Rider";

export type MagicUnitType =
  | "Bishop"
  | "Cleric"
  | "Druid"
  | "Mage"
  | "Mage Knight"
  | "Monk"
  | "Pupil"
  | "Sage"
  | "Shaman"
  | "Summoner"
  | "Troubador"
  | "Valkyrie";

export type SpecialUnitType = "Dancer" | "Bard" | "Villager" | "Magic Seal";

export interface UnitClass<C extends CombatCategory = CombatCategory> {
  category: C;
  name: string;
  flying: boolean;
  horseback: boolean;
  armored: boolean;
  weapons: C extends "PHYSICAL"
    ? PhysicalWeapon[]
    : C extends "MAGIC"
    ? MagicWeapon[]
    : SpecialWeapon[];
  promotions: string[];
  ability?: string;
  baseMovement: number;
  maxStats: {
    health: number;
    power: number;
    defense: number;
    resistance: number;
    speed: number;
    luck: number;
    skill: number;
    constitution: number;
    movement: number;
  };
}

export type StatList = {
  health: number;
  power: number;
  defense: number;
  resistance: number;
  speed: number;
  luck: number;
  skill: number;
  constitution: number;
  movement: number;
};

export type StatGrowthRateList = Omit<StatList, "constitution" | "movement">;

export type StatName = keyof StatList;

export type StatModifier = {
  stat: StatName;
  modifier: number | ((n: number) => number);
  turns: number;
};

export interface UnitSupport {
  units: [string, string];
  dialogue: {
    A: SupportDialogue;
    B: SupportDialogue;
    C: SupportDialogue;
  };
  level: SupportLevel | null;
}

export interface UnitConfig<C extends CombatCategory, U extends UnitClass<C>> {
  name: string;
  sex: "M" | "F";
  birthMonth: BirthMonth;
  bloodType: BloodType;
  level: number;
  base: U;
  supports: UnitSupport[];
  items: Item[];
  weaponLevels: {
    weapon: C extends "PHYSICAL"
      ? PhysicalWeapon
      : C extends "MAGIC"
      ? MagicWeapon
      : SpecialWeapon;
    level: C extends SpecialUnitType ? null : WeaponLevel;
  }[];
}

export type AnyUnit = UnitConfig<CombatCategory, UnitClass<CombatCategory>>;

export type Unit<C extends CombatCategory = CombatCategory> = ReturnType<
  UnitCreationService<C, UnitClass<C>>["process"]
>;

export type UnitName = keyof typeof UNITS;

export type ManagedUnit = UnitManagementService;
