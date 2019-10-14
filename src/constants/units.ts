import { Lord } from "./classes/physical";
import WEAPONS from "./weapons";
import UnitCreationService from "../services/UnitCreationService";

export const Calypso = new UnitCreationService({
  level: 15,
  name: "Calypso",
  birthMonth: "September",
  bloodType: "A",
  sex: "F",
  items: [WEAPONS["Silver Axe"]],
  weaponLevels: [{ weapon: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();

export const Artemis = new UnitCreationService({
  level: 17,
  name: "Artemis",
  birthMonth: "June",
  bloodType: "AB",
  sex: "M",
  items: [WEAPONS["Silver Axe"]],
  weaponLevels: [{ weapon: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();

const UNITS = { Calypso, Artemis };

export default UNITS;
