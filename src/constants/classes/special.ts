import { SpecialUnitClassConfig } from "../../types";

export const MagicSeal: SpecialUnitClassConfig = {
  name: "Magic Seal",
  category: "Special",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["None"],
  promotions: [],
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

export const Dancer: SpecialUnitClassConfig = {
  name: "Dancer",
  category: "Special",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Ring"],
  promotions: [],
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

export const Bard: SpecialUnitClassConfig = {
  name: "Bard",
  category: "Special",
  flying: false,
  horseback: false,
  armored: false,
  weapons: ["Instrument"],
  promotions: [],
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
