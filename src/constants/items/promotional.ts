import { PromotionalItemConfig } from "../../types";
import * as MagicClasses from "../classes/magic";
import * as PhysicalClasses from "../classes/physical";

const { Mage, Cleric, Monk, Shaman } = MagicClasses;

const {
  Archer,
  Cavalier,
  Fighter,
  Knight,
  Lady,
  Lord,
  Mercenary,
  Myrmidon,
  Nomad,
  PegasusKnight,
  Pirate,
  Thief,
  WyvernRider
} = PhysicalClasses;

export const GuidingRing: PromotionalItemConfig<"Magic"> = {
  name: "Guiding Ring",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Mage, Cleric, Monk, Shaman]
};

export const HeroCrest: PromotionalItemConfig<"Physical"> = {
  name: "Hero Crest",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Mercenary, Myrmidon, Fighter]
};

export const OceanSeal: PromotionalItemConfig<"Physical"> = {
  name: "Ocean Seal",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Pirate, Thief]
};

export const FellContract: PromotionalItemConfig<"Physical"> = {
  name: "Fell Contract",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Thief]
};

export const KnightCrest: PromotionalItemConfig<"Physical"> = {
  name: "Knight Crest",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Knight, Cavalier]
};

export const OrionsBolt: PromotionalItemConfig<"Physical"> = {
  name: "Orion's Bolt",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Archer, Nomad]
};

export const ElysianWhip: PromotionalItemConfig<"Physical"> = {
  name: "Elysian Whip",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [PegasusKnight, WyvernRider]
};

export const HeavenSeal: PromotionalItemConfig<"Physical"> = {
  name: "Heaven Seal",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  applicableUnits: [Lord, Lady]
};
