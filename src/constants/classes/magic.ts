import { UnitClass } from "../../types";

export const Pupil: UnitClass<"MAGIC"> = {
  name: "Pupil",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Anima"],
  promotions: ["Mage", "Shaman", "Monk"],
  baseMovement: 5,
  maxStats: {
    health: 60,
    power: 20,
    defense: 20,
    resistance: 20,
    speed: 20,
    luck: 30,
    skill: 20,
    constitution: 20,
    movement: 15
  }
};

export const Mage: UnitClass<"MAGIC"> = {
  name: "Mage",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Anima"],
  promotions: ["Sage", "Mage Knight", "Bishop"],
  baseMovement: 5,
  maxStats: {
    health: 60,
    power: 20,
    defense: 20,
    resistance: 20,
    speed: 20,
    luck: 30,
    skill: 20,
    constitution: 20,
    movement: 15
  }
};

export const Shaman: UnitClass<"MAGIC"> = {
  name: "Shaman",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Dark"],
  promotions: ["Druid", "Summoner"],
  baseMovement: 5,
  maxStats: {
    health: 60,
    power: 20,
    defense: 20,
    resistance: 20,
    speed: 20,
    luck: 30,
    skill: 20,
    constitution: 20,
    movement: 15
  }
};

export const Monk: UnitClass<"MAGIC"> = {
  name: "Monk",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Light"],
  promotions: ["Sage", "Valkyrie", "Bishop"],
  baseMovement: 5,
  maxStats: {
    health: 60,
    power: 20,
    defense: 20,
    resistance: 20,
    speed: 20,
    luck: 30,
    skill: 20,
    constitution: 20,
    movement: 15
  }
};

export const Cleric: UnitClass<"MAGIC"> = {
  name: "Cleric",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Staves"],
  promotions: ["Bishop", "Valkyrie"],
  baseMovement: 5,
  maxStats: {
    health: 60,
    power: 20,
    defense: 20,
    resistance: 20,
    speed: 20,
    luck: 30,
    skill: 20,
    constitution: 20,
    movement: 15
  }
};

export const Troubador: UnitClass<"MAGIC"> = {
  name: "Troubador",
  category: "MAGIC",
  horseback: true,
  flying: false,
  armored: false,
  weapons: ["Staves"],
  promotions: ["Bishop", "Valkyrie"],
  baseMovement: 7,
  maxStats: {
    health: 60,
    power: 20,
    defense: 20,
    resistance: 20,
    speed: 20,
    luck: 30,
    skill: 20,
    constitution: 20,
    movement: 15
  }
};

export const Valkyrie: UnitClass<"MAGIC"> = {
  name: "Valkyrie",
  category: "MAGIC",
  horseback: true,
  flying: false,
  armored: false,
  weapons: ["Staves", "Light"],
  promotions: [],
  baseMovement: 7,
  maxStats: {
    health: 60,
    power: 25,
    defense: 20,
    resistance: 28,
    speed: 25,
    luck: 30,
    skill: 24,
    constitution: 20,
    movement: 15
  }
};

export const Sage: UnitClass<"MAGIC"> = {
  name: "Sage",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Staves", "Light", "Anima"],
  promotions: [],
  baseMovement: 6,
  maxStats: {
    health: 60,
    power: 30,
    defense: 21,
    resistance: 25,
    speed: 26,
    luck: 30,
    skill: 28,
    constitution: 20,
    movement: 15
  }
};

export const Mage_Knight: UnitClass<"MAGIC"> = {
  name: "Mage Knight",
  category: "MAGIC",
  horseback: true,
  flying: false,
  armored: false,
  weapons: ["Staves", "Light", "Anima"],
  promotions: [],
  baseMovement: 8,
  maxStats: {
    health: 60,
    power: 30,
    defense: 21,
    resistance: 25,
    speed: 26,
    luck: 30,
    skill: 28,
    constitution: 20,
    movement: 15
  }
};

export const Druid: UnitClass<"MAGIC"> = {
  name: "Druid",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Staves", "Dark", "Anima"],
  promotions: [],
  baseMovement: 6,
  maxStats: {
    health: 60,
    power: 29,
    defense: 21,
    resistance: 28,
    speed: 26,
    luck: 30,
    skill: 26,
    constitution: 20,
    movement: 15
  }
};

export const Bishop: UnitClass<"MAGIC"> = {
  name: "Bishop",
  category: "MAGIC",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Staves", "Light"],
  promotions: [],
  ability: "Slayer",
  baseMovement: 6,
  maxStats: {
    health: 60,
    power: 25,
    defense: 21,
    resistance: 30,
    speed: 26,
    luck: 30,
    skill: 25,
    constitution: 20,
    movement: 15
  }
};
