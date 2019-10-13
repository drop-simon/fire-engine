import { UnitClass } from "../../types";

export const Lord: UnitClass<"PHYSICAL"> = {
  name: "Lord",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Lances"],
  promotions: ["Great Lord"],
  baseMovement: 5,
  ability: null,
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

export const Lady: UnitClass<"PHYSICAL"> = {
  name: "Lady",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords"],
  promotions: ["Great Lady"],
  baseMovement: 5,
  ability: null,
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

export const Myrmidon: UnitClass<"PHYSICAL"> = {
  name: "Myrmidon",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords"],
  promotions: ["Assassin", "Swordmaster"],
  baseMovement: 5,
  ability: null,
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

export const Mercenary: UnitClass<"PHYSICAL"> = {
  name: "Mercenary",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords"],
  promotions: ["Hero"],
  baseMovement: 5,
  ability: null,
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

export const Knight: UnitClass<"PHYSICAL"> = {
  name: "Knight",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: true,
  weapons: ["Lances"],
  promotions: ["General", "Great Knight"],
  baseMovement: 4,
  ability: null,
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

export const Pirate: UnitClass<"PHYSICAL"> = {
  name: "Pirate",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Axes"],
  promotions: ["Berserker", "Warrior"],
  baseMovement: 5,
  ability: null,
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

export const Cavalier: UnitClass<"PHYSICAL"> = {
  name: "Theif",
  category: "PHYSICAL",
  flying: false,
  horseback: true,
  armored: false,
  weapons: ["Swords", "Lances"],
  promotions: ["Paladin", "Great Knight"],
  baseMovement: 7,
  ability: null,
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

export const Fighter: UnitClass<"PHYSICAL"> = {
  name: "Fighter",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Axes"],
  promotions: ["Warrior", "Hero"],
  baseMovement: 5,
  ability: null,
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

export const Recruit: UnitClass<"PHYSICAL"> = {
  name: "Recruit",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Lances"],
  promotions: ["Knight", "Cavalier"],
  baseMovement: 4,
  ability: null,
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

export const Journeyman: UnitClass<"PHYSICAL"> = {
  name: "Journeyman",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Axes"],
  promotions: ["Fighter", "Pirate"],
  baseMovement: 5,
  ability: null,
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

export const Archer: UnitClass<"PHYSICAL"> = {
  name: "Archer",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Bows"],
  promotions: ["Sniper", "Ranger"],
  baseMovement: 5,
  ability: null,
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

export const Pegasus_Knight: UnitClass<"PHYSICAL"> = {
  name: "Pegasus Knight",
  category: "PHYSICAL",
  flying: true,
  horseback: false,
  armored: false,
  weapons: ["Lances"],
  promotions: ["Falcoknight", "Wyvern Knight"],
  baseMovement: 7,
  ability: null,
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

export const Wyvern_Rider: UnitClass<"PHYSICAL"> = {
  name: "Wyvern Rider",
  category: "PHYSICAL",
  flying: true,
  horseback: false,
  armored: false,
  weapons: ["Lances"],
  promotions: ["Wyvern Lord", "Wyvern Knight"],
  baseMovement: 7,
  ability: null,
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

export const Theif: UnitClass<"PHYSICAL"> = {
  name: "Theif",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords"],
  promotions: ["Assassin", "Rogue"],
  baseMovement: 6,
  ability: null,
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

export const Assassin: UnitClass<"PHYSICAL"> = {
  name: "Assassin",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords"],
  promotions: [],
  baseMovement: 6,
  ability: null,
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

export const Rogue: UnitClass<"PHYSICAL"> = {
  name: "Rogue",
  category: "PHYSICAL",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords"],
  promotions: [],
  baseMovement: 6,
  ability: null,
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
