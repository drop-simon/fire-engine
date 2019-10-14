import { Lord } from "./classes/physical";
import { Weapons } from ".";
import UnitCreationService from "../services/UnitCreationService";

export const Calypso = new UnitCreationService<"Physical">({
  level: 15,
  name: "Calypso",
  birthMonth: "September",
  bloodType: "A",
  sex: "F",
  items: [Weapons.SilverAxe],
  weaponLevels: [{ weapon: "Lances" as const, level: "A" as const }],
  supports: {},
  base: Lord
}).process();

export const Artemis = new UnitCreationService<"Physical">({
  level: 17,
  name: "Artemis",
  birthMonth: "June",
  bloodType: "AB",
  sex: "M",
  items: [Weapons.SilverAxe],
  weaponLevels: [{ weapon: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();

const Units = { Calypso, Artemis };

export default Units;
