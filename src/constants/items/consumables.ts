import { ConsumableItemConfig, StatListType, Unit } from "../../types";

const getCanIncreaseUnitStat = (unit: Unit, stat: keyof StatListType) =>
  unit.base.maxStats[stat] > unit.stats[stat];

export const Vulnerary: ConsumableItemConfig = {
  name: "Vulnerary",
  numUses: 3,
  maxUses: 3,
  category: "Consumable",
  effect: { static: { health: 10 } },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false,
  cost: 300
};

export const Elixir: ConsumableItemConfig = {
  name: "Vulnerary",
  numUses: 3,
  maxUses: 3,
  category: "Consumable",
  effect: { static: { health: 60 } },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false,
  cost: 3000
};

export const Antitoxin: ConsumableItemConfig = {
  name: "Antitoxin",
  numUses: 2,
  maxUses: 2,
  category: "Consumable",
  effect: { curesPoison: true },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false,
  cost: 450
};

export const PureWater: ConsumableItemConfig = {
  name: "Pure Water",
  numUses: 2,
  maxUses: 2,
  category: "Consumable",
  effect: { ongoing: { resistance: { amount: 2, numTurns: 3 } } },
  getIsUseableInBattle: () => true,
  getIsUseableInOverworld: () => false,
  cost: 900
};

export const Speedwing: ConsumableItemConfig = {
  name: "Speedwing",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { speed: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "speed"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "speed"),
  cost: 8000
};

export const SkillTome: ConsumableItemConfig = {
  name: "Skill Tome",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { skill: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "skill"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "skill"),
  cost: 8000
};

export const EnergyRing: ConsumableItemConfig = {
  name: "Energy Ring",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { power: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "power"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "power"),
  cost: 8000
};

export const DragonShield: ConsumableItemConfig = {
  name: "Dragon Shield",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { defense: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "defense"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "defense"),
  cost: 8000
};

export const Talisman: ConsumableItemConfig = {
  name: "Talisman",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { resistance: 2 } },
  getIsUseableInBattle: ({ unit }) =>
    getCanIncreaseUnitStat(unit, "resistance"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "resistance"),
  cost: 8000
};

export const AngelicRobe: ConsumableItemConfig = {
  name: "Angelic Robe",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { health: 7 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "health"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "health"),
  cost: 8000
};

export const GoddessIcon: ConsumableItemConfig = {
  name: "Goddess Icon",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { luck: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "luck"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "luck"),
  cost: 8000
};

export const BodyRing: ConsumableItemConfig = {
  name: "Body Ring",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { constitution: 2 } },
  getIsUseableInBattle: ({ unit }) =>
    getCanIncreaseUnitStat(unit, "constitution"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "constitution"),
  cost: 8000
};

export const Swiftsoles: ConsumableItemConfig = {
  name: "Swiftsoles",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getIsUseableInBattle: ({ unit }) => getCanIncreaseUnitStat(unit, "movement"),
  getIsUseableInOverworld: unit => getCanIncreaseUnitStat(unit, "movement"),
  cost: 8000
};

export const ChestKey: ConsumableItemConfig = {
  name: "Chest Key",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getIsUseableInBattle: ({ unit, battleManager }) => {
    const pathfinder = battleManager.mapManager.pathfinders[unit.name];
    if (unit.items.length > 4 || !pathfinder) {
      return false;
    }

    const { currentCoordinates, createTileKey } = pathfinder;

    return battleManager.mapManager.chests.some(
      ({ coordinates, isOpened }) =>
        !isOpened &&
        createTileKey(coordinates) === createTileKey(currentCoordinates)
    );
  },
  getIsUseableInOverworld: () => false,
  cost: 300
};

export const DoorKey: ConsumableItemConfig = {
  name: "Door Key",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getIsUseableInBattle: ({ unit, battleManager }) => {
    const pathfinder = battleManager.mapManager.pathfinders[unit.name];
    if (!pathfinder) {
      return false;
    }
    const { currentCoordinates, getAdjacentTiles } = pathfinder;
    return getAdjacentTiles(currentCoordinates).some(
      tile => tile.name === "door"
    );
  },
  getIsUseableInOverworld: () => false,
  cost: 50
};

export const Lockpick: ConsumableItemConfig = {
  name: "Lockpick",
  numUses: 15,
  maxUses: 15,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getIsUseableInBattle: ({ unit, battleManager }) => {
    if (unit.base.name !== "Thief") {
      return false;
    }
    return (
      DoorKey.getIsUseableInBattle({ unit, battleManager }) ||
      ChestKey.getIsUseableInBattle({ unit, battleManager })
    );
  },
  getIsUseableInOverworld: () => false,
  cost: 1200
};

export const RedGem: ConsumableItemConfig = {
  name: "Red Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getIsUseableInBattle: () => false,
  getIsUseableInOverworld: () => false,
  cost: 5000
};

export const BlueGem: ConsumableItemConfig = {
  name: "Blue Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getIsUseableInBattle: () => false,
  getIsUseableInOverworld: () => false,
  cost: 10000
};

export const WhiteGem: ConsumableItemConfig = {
  name: "White Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getIsUseableInBattle: () => false,
  getIsUseableInOverworld: () => false,
  cost: 20000
};

export const BlackGem: ConsumableItemConfig = {
  name: "Black Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getIsUseableInBattle: () => false,
  getIsUseableInOverworld: () => false,
  cost: 30000
};

export const GoldGem: ConsumableItemConfig = {
  name: "Gold Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getIsUseableInBattle: () => false,
  getIsUseableInOverworld: () => false,
  cost: 40000
};
