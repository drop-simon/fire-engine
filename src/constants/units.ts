import { Lord } from "./classes/physical";
import { Items } from ".";
import UnitCreationService from "../services/UnitCreationService";

export const Calypso = new UnitCreationService<"Physical">({
  level: 15,
  name: "Calypso",
  birthMonth: "September",
  bloodType: "A",
  sex: "F",
  items: [Items.Weapons.Axes.SilverAxe],
  weaponLevels: [{ specialty: "Lances", level: "A" }],
  supports: {},
  base: Lord
}).process();

export const Artemis = new UnitCreationService<"Physical">({
  level: 17,
  name: "Artemis",
  birthMonth: "June",
  bloodType: "AB",
  sex: "M",
  items: [Items.Weapons.Axes.SilverAxe],
  weaponLevels: [{ specialty: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();
