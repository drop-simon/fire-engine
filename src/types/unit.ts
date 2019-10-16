import {
  PhysicalWeaponSpecialtyType,
  MagicWeaponSpecialtyType,
  SpecialWeaponSpecialtyType,
  WeaponLevelType,
  SupportDialogueType,
  SupportLevelType,
  BirthMonthType,
  BloodType
} from ".";
import { ItemType, CombatCategoryType, WeaponSpecialtyType } from ".";
import UnitCreationService from "../services/UnitCreationService";
import UnitManagementService from "../services/UnitManagementService";

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

interface BaseUnitClassConfigType {
  name: string;
  flying: boolean;
  horseback: boolean;
  armored: boolean;
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

export interface MagicUnitClassConfigType extends BaseUnitClassConfigType {
  category: "Magic";
  weapons: MagicWeaponSpecialtyType[];
}

export interface PhysicalUnitClassConfigType extends BaseUnitClassConfigType {
  category: "Physical";
  weapons: PhysicalWeaponSpecialtyType[];
}

export interface SpecialUnitClassConfigType extends BaseUnitClassConfigType {
  category: "Special";
  weapons: SpecialWeaponSpecialtyType[];
}

export type AnyUnitClassConfigType =
  | MagicUnitClassConfigType
  | PhysicalUnitClassConfigType
  | SpecialUnitClassConfigType;

export type UnitClassConfigType<
  C extends CombatCategoryType
> = C extends "Physical"
  ? PhysicalUnitClassConfigType
  : C extends "Magic"
  ? MagicUnitClassConfigType
  : SpecialUnitClassConfigType;

export type StatListType = {
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

export type StatGrowthRateListType = Omit<
  StatListType,
  "constitution" | "movement"
>;

export type StatNameType = keyof StatListType;

export type StatModifierType = {
  stat: StatNameType;
  modifier: number | ((n: number) => number);
  turns: number;
};

export type SupportLevelType = "A" | "B" | "C";

export type SupportDialogueType = {
  character: string;
  text: string;
}[];

export interface UnitSupportType {
  units: [string, string];
  dialogue: {
    A: SupportDialogueType;
    B: SupportDialogueType;
    C: SupportDialogueType;
  };
  level: SupportLevelType | null;
}

export interface UnitConfigType<C extends CombatCategoryType> {
  name: string;
  sex: "M" | "F";
  birthMonth: BirthMonthType;
  bloodType: BloodType;
  level: number;
  base: UnitClassConfigType<C>;
  supports: { [unitName: string]: SupportLevelType };
  items: ItemType[];
  weaponLevels: {
    specialty: WeaponSpecialtyType<C>;
    level: C extends SpecialUnitType ? null : WeaponLevelType;
  }[];
}

export type AnyUnitType = UnitConfigType<CombatCategoryType>;

export type UnitType = ReturnType<
  UnitCreationService<CombatCategoryType>["process"]
>;

export type ManagedUnitType = UnitManagementService;

export type UnitDependantFunctionType<T extends any> = (unit: UnitType) => T;

export type UnitAllegianceType = "PLAYER" | "ENEMY" | "NEUTRAL";

export type UnitBehaviorType =
  | "STATIONARY"
  | "PASSIVE"
  | "ACTIVE"
  | "SUPPORT"
  | "THIEF";
