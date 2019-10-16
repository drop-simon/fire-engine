import { PhysicalWeaponConfigType } from "../../types";

const IronAxe: PhysicalWeaponConfigType = {
  name: "Iron Axe",
  category: "Weapon",
  subcategory: "Physical",
  specialty: "Axes",
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
};

const SteelAxe: PhysicalWeaponConfigType = {
  name: "Steel Axe",
  category: "Weapon",
  subcategory: "Physical",
  specialty: "Axes",
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
};

const SilverAxe: PhysicalWeaponConfigType = {
  name: "Silver Axe",
  category: "Weapon",
  subcategory: "Physical",
  specialty: "Axes",
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
};

const Axes = {
  IronAxe,
  SteelAxe,
  SilverAxe
};

export default Axes;
