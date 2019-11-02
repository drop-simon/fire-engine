import { ConsumableItemConfig, StatListType, Unit } from "../../types";
import {
  MapManagedUnit,
  MapTileInformation
} from "../../services/MapManagementService";

const getCanIncreaseUnitStat = (unit: Unit, stat: keyof StatListType) =>
  unit.base.maxStats[stat] > unit.stats[stat];

export const Vulnerary: ConsumableItemConfig = {
  name: "Vulnerary",
  numUses: 3,
  maxUses: 3,
  category: "Consumable",
  effect: { static: { health: 10 } },
  getCanUseInMap: () => true,
  getCanUseInOverworld: () => false,
  cost: 300
};

export const Elixir: ConsumableItemConfig = {
  name: "Vulnerary",
  numUses: 3,
  maxUses: 3,
  category: "Consumable",
  effect: { static: { health: 60 } },
  getCanUseInMap: () => true,
  getCanUseInOverworld: () => false,
  cost: 3000
};

export const Antitoxin: ConsumableItemConfig = {
  name: "Antitoxin",
  numUses: 2,
  maxUses: 2,
  category: "Consumable",
  effect: { curesPoison: true },
  getCanUseInMap: () => true,
  getCanUseInOverworld: () => false,
  cost: 450
};

export const PureWater: ConsumableItemConfig = {
  name: "Pure Water",
  numUses: 2,
  maxUses: 2,
  category: "Consumable",
  effect: { ongoing: { resistance: { amount: 2, numTurns: 3 } } },
  getCanUseInMap: () => true,
  getCanUseInOverworld: () => false,
  cost: 900
};

export const Speedwing: ConsumableItemConfig = {
  name: "Speedwing",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { speed: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "speed"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "speed"),
  cost: 8000
};

export const SkillTome: ConsumableItemConfig = {
  name: "Skill Tome",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { skill: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "skill"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "skill"),
  cost: 8000
};

export const EnergyRing: ConsumableItemConfig = {
  name: "Energy Ring",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { power: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "power"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "power"),
  cost: 8000
};

export const DragonShield: ConsumableItemConfig = {
  name: "Dragon Shield",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { defense: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "defense"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "defense"),
  cost: 8000
};

export const Talisman: ConsumableItemConfig = {
  name: "Talisman",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { resistance: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "resistance"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "resistance"),
  cost: 8000
};

export const AngelicRobe: ConsumableItemConfig = {
  name: "Angelic Robe",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { health: 7 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "health"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "health"),
  cost: 8000
};

export const GoddessIcon: ConsumableItemConfig = {
  name: "Goddess Icon",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { luck: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "luck"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "luck"),
  cost: 8000
};

export const BodyRing: ConsumableItemConfig = {
  name: "Body Ring",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { constitution: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "constitution"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "constitution"),
  cost: 8000
};

export const Swiftsoles: ConsumableItemConfig = {
  name: "Swiftsoles",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getCanUseInMap: ({ unitManager: { unit } }) =>
    getCanIncreaseUnitStat(unit, "movement"),
  getCanUseInOverworld: unit => getCanIncreaseUnitStat(unit, "movement"),
  cost: 8000
};

export const ChestKey: ConsumableItemConfig = {
  name: "Chest Key",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getCanUseInMap: ({ unitManager, pathfinder }) => {
    if (unitManager.items.length > 4) {
      return false;
    }

    const { currentCoordinates, compareCoordinates, mapManager } = pathfinder;
    return mapManager.chests.some(
      ({ coordinates, isOpened }) =>
        !isOpened && compareCoordinates(coordinates, currentCoordinates)
    );
  },
  getCanUseInOverworld: () => false,
  cost: 300
};

export const DoorKey: ConsumableItemConfig = {
  name: "Door Key",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getCanUseInMap: ({ pathfinder }) => {
    if (!pathfinder) {
      return false;
    }
    const { currentCoordinates, getAdjacentTiles } = pathfinder;
    return getAdjacentTiles(currentCoordinates).some(
      tile => tile.terrain.base.name === "door"
    );
  },
  getCanUseInOverworld: () => false,
  cost: 50
};

export const Lockpick: ConsumableItemConfig = {
  name: "Lockpick",
  numUses: 15,
  maxUses: 15,
  category: "Consumable",
  effect: { permanent: { movement: 2 } },
  getCanUseInMap: ({ unitManager, pathfinder, allegiance }) => {
    if (unitManager.unit.base.name !== "Thief") {
      return false;
    }
    return (
      DoorKey.getCanUseInMap({ unitManager, pathfinder, allegiance }) ||
      ChestKey.getCanUseInMap({ unitManager, pathfinder, allegiance })
    );
  },
  getCanUseInOverworld: () => false,
  cost: 1200
};

export const RedGem: ConsumableItemConfig = {
  name: "Red Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getCanUseInMap: () => false,
  getCanUseInOverworld: () => false,
  cost: 5000
};

export const BlueGem: ConsumableItemConfig = {
  name: "Blue Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getCanUseInMap: () => false,
  getCanUseInOverworld: () => false,
  cost: 10000
};

export const WhiteGem: ConsumableItemConfig = {
  name: "White Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getCanUseInMap: () => false,
  getCanUseInOverworld: () => false,
  cost: 20000
};

export const BlackGem: ConsumableItemConfig = {
  name: "Black Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getCanUseInMap: () => false,
  getCanUseInOverworld: () => false,
  cost: 30000
};

export const GoldGem: ConsumableItemConfig = {
  name: "Gold Gem",
  numUses: 1,
  maxUses: 1,
  category: "Consumable",
  effect: undefined,
  getCanUseInMap: () => false,
  getCanUseInOverworld: () => false,
  cost: 40000
};
