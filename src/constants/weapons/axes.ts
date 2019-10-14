import { PhysicalWeaponConfigType } from "../../types";

const AXES = {
  ["Iron Axe"]: {
    category: "Physical",
    type: "Axes",
    level: "E",
    maxUses: 45,
    numUses: 45,
    range: [1, 1],
    power: 8,
    accuracy: 0.75,
    weight: 10,
    critical: 0,
    experience: 1,
    cost: 270
  } as PhysicalWeaponConfigType,
  ["Steel Axe"]: {
    category: "Physical",
    type: "Axes",
    level: "E",
    maxUses: 30,
    numUses: 30,
    range: [1, 1],
    power: 11,
    accuracy: 0.65,
    weight: 15,
    critical: 0,
    experience: 2,
    cost: 360
  } as PhysicalWeaponConfigType,
  ["Silver Axe"]: {
    category: "Physical",
    type: "Axes",
    level: "A",
    maxUses: 20,
    numUses: 20,
    range: [1, 1],
    power: 15,
    accuracy: 0.7,
    weight: 12,
    critical: 0,
    experience: 1,
    cost: 1000
  } as PhysicalWeaponConfigType
};

export default AXES;
