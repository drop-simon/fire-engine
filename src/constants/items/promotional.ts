import { PromotionalItemConfig } from "../../types";
import { createCanUsePromotionalItem } from "./utils";

const GUIDING_RING_UNITS = [
  "Mage" as const,
  "Cleric" as const,
  "Monk" as const,
  "Shaman" as const
];
export const GuidingRing: PromotionalItemConfig<"Magic"> = {
  name: "Guiding Ring",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, GUIDING_RING_UNITS),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, GUIDING_RING_UNITS)
};

const HERO_CREST_UNITS = [
  "Mercenary" as const,
  "Myrmidon" as const,
  "Fighter" as const
];
export const HeroCrest: PromotionalItemConfig<"Physical"> = {
  name: "Hero Crest",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, HERO_CREST_UNITS),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, HERO_CREST_UNITS)
};

export const OceanSeal: PromotionalItemConfig<"Physical"> = {
  name: "Ocean Seal",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, ["Pirate", "Thief"]),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, ["Pirate", "Thief"])
};

export const FellContract: PromotionalItemConfig<"Physical"> = {
  name: "Fell Contract",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) => createCanUsePromotionalItem(unit, ["Thief"]),
  getCanUseInOverworld: unit => createCanUsePromotionalItem(unit, ["Thief"])
};

export const KnightCrest: PromotionalItemConfig<"Physical"> = {
  name: "Knight Crest",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, ["Knight", "Cavalier"]),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, ["Knight", "Cavalier"])
};

export const OrionsBolt: PromotionalItemConfig<"Physical"> = {
  name: "Orion's Bolt",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, ["Archer", "Nomad"]),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, ["Archer", "Nomad"])
};

export const ElysianWhip: PromotionalItemConfig<"Physical"> = {
  name: "Elysian Whip",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, ["Pegasus Knight", "Wyvern Rider"]),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, ["Pegasus Knight", "Wyvern Rider"])
};

export const HeavenSeal: PromotionalItemConfig<"Physical"> = {
  name: "Heaven Seal",
  category: "Promotional",
  numUses: 1,
  maxUses: 1,
  cost: 10000,
  getCanUseInMap: ({ unit }) =>
    createCanUsePromotionalItem(unit, ["Lord", "Lady"]),
  getCanUseInOverworld: unit =>
    createCanUsePromotionalItem(unit, ["Lord", "Lady"])
};
