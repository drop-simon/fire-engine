import { MagicUnitClassConfig } from "../../types";

export const Pupil: MagicUnitClassConfig = {
  name: "Pupil",
  category: "Magic",
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

export const Mage: MagicUnitClassConfig = {
  name: "Mage",
  category: "Magic",
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

export const Shaman: MagicUnitClassConfig = {
  name: "Shaman",
  category: "Magic",
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

export const Summoner: MagicUnitClassConfig = {
  name: "Summoner",
  category: "Magic",
  horseback: false,
  flying: false,
  armored: false,
  weapons: ["Dark", "Staves"],
  promotions: [],
  baseMovement: 5,
  maxStats: {
    health: 60,
    power: 27,
    defense: 20,
    resistance: 28,
    speed: 26,
    luck: 30,
    skill: 27,
    constitution: 20,
    movement: 15
  }
};

export const Monk: MagicUnitClassConfig = {
  name: "Monk",
  category: "Magic",
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

export const Cleric: MagicUnitClassConfig = {
  name: "Cleric",
  category: "Magic",
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

export const Troubador: MagicUnitClassConfig = {
  name: "Troubador",
  category: "Magic",
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

export const Valkyrie: MagicUnitClassConfig = {
  name: "Valkyrie",
  category: "Magic",
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

export const Sage: MagicUnitClassConfig = {
  name: "Sage",
  category: "Magic",
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

export const MageKnight: MagicUnitClassConfig = {
  name: "Mage Knight",
  category: "Magic",
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

export const Druid: MagicUnitClassConfig = {
  name: "Druid",
  category: "Magic",
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

export const Bishop: MagicUnitClassConfig = {
  name: "Bishop",
  category: "Magic",
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
