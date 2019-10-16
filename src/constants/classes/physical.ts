import { PhysicalUnitClassConfigType } from "../../types";

export const Lord: PhysicalUnitClassConfigType = {
  name: "Lord",
  category: "Physical",
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

export const Lady: PhysicalUnitClassConfigType = {
  name: "Lady",
  category: "Physical",
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

export const Myrmidon: PhysicalUnitClassConfigType = {
  name: "Myrmidon",
  category: "Physical",
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

export const Mercenary: PhysicalUnitClassConfigType = {
  name: "Mercenary",
  category: "Physical",
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

export const Hero: PhysicalUnitClassConfigType = {
  name: "Hero",
  category: "Physical",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Swords", "Axes"],
  promotions: [],
  baseMovement: 6,
  ability: null,
  maxStats: {
    health: 60,
    power: 25,
    defense: 24,
    resistance: 23,
    speed: 26,
    luck: 30,
    skill: 30,
    constitution: 20,
    movement: 15
  }
};

export const Knight: PhysicalUnitClassConfigType = {
  name: "Knight",
  category: "Physical",
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

export const Pirate: PhysicalUnitClassConfigType = {
  name: "Pirate",
  category: "Physical",
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

export const Cavalier: PhysicalUnitClassConfigType = {
  name: "Theif",
  category: "Physical",
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

export const Fighter: PhysicalUnitClassConfigType = {
  name: "Fighter",
  category: "Physical",
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

export const Recruit: PhysicalUnitClassConfigType = {
  name: "Recruit",
  category: "Physical",
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

export const Journeyman: PhysicalUnitClassConfigType = {
  name: "Journeyman",
  category: "Physical",
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

export const Archer: PhysicalUnitClassConfigType = {
  name: "Archer",
  category: "Physical",
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

export const PegasusKnight: PhysicalUnitClassConfigType = {
  name: "Pegasus Knight",
  category: "Physical",
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

export const WyvernRider: PhysicalUnitClassConfigType = {
  name: "Wyvern Rider",
  category: "Physical",
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

export const Theif: PhysicalUnitClassConfigType = {
  name: "Theif",
  category: "Physical",
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

export const Assassin: PhysicalUnitClassConfigType = {
  name: "Assassin",
  category: "Physical",
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

export const Rogue: PhysicalUnitClassConfigType = {
  name: "Rogue",
  category: "Physical",
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

export const Warrior: PhysicalUnitClassConfigType = {
  name: "Warrior",
  category: "Physical",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Axes", "Bows"],
  promotions: [],
  baseMovement: 6,
  ability: null,
  maxStats: {
    health: 60,
    power: 30,
    defense: 26,
    resistance: 22,
    speed: 26,
    luck: 30,
    skill: 28,
    constitution: 20,
    movement: 15
  }
};

export const Nomad: PhysicalUnitClassConfigType = {
  name: "Nomad",
  category: "Physical",
  flying: false,
  horseback: true,
  armored: false,
  weapons: ["Bows"],
  promotions: ["Nomadic Trooper"],
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

export const NomadicTrooper: PhysicalUnitClassConfigType = {
  name: "Nomadic Trooper",
  category: "Physical",
  flying: false,
  horseback: true,
  armored: false,
  weapons: ["Bows", "Swords"],
  promotions: [],
  baseMovement: 8,
  ability: null,
  maxStats: {
    health: 60,
    power: 25,
    defense: 24,
    resistance: 23,
    speed: 30,
    luck: 30,
    skill: 28,
    constitution: 20,
    movement: 15
  }
};
