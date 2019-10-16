import { ConsumableItemConfig, StatListType, UnitType } from "../../types";

const getCanIncreaseUnitStat = (unit: UnitType, stat: keyof StatListType) =>
  unit.base.maxStats[stat] > unit.stats[stat];

export const Vulnerary: ConsumableItemConfig = {
  name: "Vulnerary",
  numUses: 3,
  maxUses: 3,
  category: "Consumable",
  effect: { static: { health: 10 } },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false
};

export const Elixir: ConsumableItemConfig = {
  name: "Vulnerary",
  numUses: 3,
  maxUses: 3,
  category: "Consumable",
  effect: { static: { health: 60 } },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false
};

export const Antitoxin: ConsumableItemConfig = {
  name: "Antitoxin",
  numUses: 2,
  maxUses: 2,
  category: "Consumable",
  effect: { curesPoison: true },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false
};

export const PureWater: ConsumableItemConfig = {
  name: "Pure Water",
  numUses: 2,
  maxUses: 2,
  category: "Consumable",
  effect: { ongoing: { resistance: { amount: 2, numTurns: 3 } } },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false
};

export const Speedwing: ConsumableItemConfig = {
  name: "Speedwing",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { speed: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "speed"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "speed")
};

export const SkillTome: ConsumableItemConfig = {
  name: "Skill Tome",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { skill: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "skill"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "skill")
};

export const EnergyRing: ConsumableItemConfig = {
  name: "Energy Ring",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { power: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "power"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "power")
};

export const DragonShield: ConsumableItemConfig = {
  name: "Dragon Shield",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { defense: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "defense"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "defense")
};

export const Talisman: ConsumableItemConfig = {
  name: "Talisman",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { resistance: 2 } },
  getIsUseableInBattle: ({ unit }) =>
    getCanIncreaseUnitStat(unit, "resistance"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "resistance")
};

export const AngelicRobe: ConsumableItemConfig = {
  name: "Angelic Robe",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { health: 7 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "health"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "health")
};

export const GoddessIcon: ConsumableItemConfig = {
  name: "Goddess Icon",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { luck: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "luck"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "luck")
};

export const BodyRing: ConsumableItemConfig = {
  name: "Body Ring",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { constitution: 2 } },
  getIsUseableInBattle: ({ unit }) =>
    getCanIncreaseUnitStat(unit, "constitution"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "constitution")
};

export const Swiftsoles: ConsumableItemConfig = {
  name: "Swiftsoles",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "movement"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "movement")
};
