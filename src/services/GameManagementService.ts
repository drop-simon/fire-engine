import {
  UnitType,
  AnyUnitClassConfigType,
  StatGrowthRateListType
} from "../types";
import EventService from "./EventService";
import UnitManagementService from "./UnitManagementService";
import { DialogueQueue } from "./DialogueManagementService";

type GameEventHandlers = {
  unitLevelUp: (args: {
    unit: UnitType;
    prevStats: StatGrowthRateListType;
    nextStats: StatGrowthRateListType;
  }) => any;
  dialogue: (dialogueQueue: DialogueQueue) => any;
};

export default class GameManagementService extends EventService<
  GameEventHandlers
> {
  unitClasses = new Map<string, AnyUnitClassConfigType>();
  units = new Map<string, UnitType>();
  chapters = new Map();

  registerUnit(unit: UnitType) {
    this.units.set(unit.name, unit);
    return this;
  }

  getUnit(unitName: string) {
    const unit = this.units.get(unitName);
    if (!unit) {
      return null;
    }
    return new UnitManagementService({ unit, gameManager: this });
  }
}
