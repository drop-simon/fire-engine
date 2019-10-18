import {
  PhysicalWeaponSpecialty,
  MagicWeaponSpecialty,
  SpecialWeaponSpecialty,
  WeaponLevelType,
  SupportDialogueType,
  SupportLevelType,
  BirthMonthType as BirthMonth,
  BloodType
} from ".";
import { Item, CombatCategory, WeaponSpecialty } from ".";
import UnitCreationService from "../services/UnitCreationService";
import BattleUnitManagementService from "../services/BattleManagementService/BattleUnitManagementService";

export type PhysicalUnitClassName =
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
  | "Nomad"
  | "Nomadic Trooper"
  | "Paladin"
  | "Pegasus Knight"
  | "Pirate"
  | "Ranger"
  | "Recruit"
  | "Rogue"
  | "Sniper"
  | "Soldier"
  | "Swordmaster"
  | "Thief"
  | "Warrior"
  | "Wyvern Knight"
  | "Wyvern Lord"
  | "Wyvern Rider";

export type MagicUnitClassName =
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

export type SpecialUnitClassName =
  | "Dancer"
  | "Bard"
  | "Villager"
  | "Magic Seal";

export type UnitClassName<C extends CombatCategory> = C extends "Magic"
  ? MagicUnitClassName
  : C extends "Special"
  ? SpecialUnitClassName
  : PhysicalUnitClassName;

export type AnyUnitClassName =
  | MagicUnitClassName
  | SpecialUnitClassName
  | PhysicalUnitClassName;

interface BaseUnitClassConfig<C extends CombatCategory> {
  name: UnitClassName<C>;
  category: C;
  weapons: WeaponSpecialty<C>[];
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

export interface MagicUnitClassConfig extends BaseUnitClassConfig<"Magic"> {}

export interface PhysicalUnitClassConfig
  extends BaseUnitClassConfig<"Physical"> {}

export interface SpecialUnitClassConfig
  extends BaseUnitClassConfig<"Special"> {}

export type AnyUnitClassConfigType =
  | MagicUnitClassConfig
  | PhysicalUnitClassConfig
  | SpecialUnitClassConfig;

export type UnitClassConfig<C extends CombatCategory> = C extends "Physical"
  ? PhysicalUnitClassConfig
  : C extends "Magic"
  ? MagicUnitClassConfig
  : SpecialUnitClassConfig;

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

export interface UnitConfig<C extends CombatCategory> {
  name: string;
  sex: "M" | "F";
  birthMonth: BirthMonth;
  bloodType: BloodType;
  level: number;
  base: UnitClassConfig<C>;
  supports: { [unitName: string]: SupportLevelType };
  items: Item[];
  weaponLevels: {
    specialty: WeaponSpecialty<C>;
    level: C extends SpecialUnitClassName ? null : WeaponLevelType;
  }[];
}

export type AnyUnit = UnitConfig<CombatCategory>;

export type Unit = ReturnType<UnitCreationService<CombatCategory>["process"]>;

export type BattleManagedUnit = BattleUnitManagementService;

export type UnitDependantFunction<T extends any> = (unit?: Unit) => T;

export type UnitAllegiance = "PLAYER" | "ENEMY" | "NEUTRAL";

export type UnitBehavior =
  | "STATIONARY"
  | "PASSIVE"
  | "ACTIVE"
  | "SUPPORT"
  | "THIEF";
