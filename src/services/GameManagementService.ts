import {
  UnitType,
  AnyUnitClassConfigType,
  StatGrowthRateListType
} from "../types";
import EventService from "./EventService";
import { Units } from "../constants";
import UnitManagementService from "./UnitManagementService";

type GameEventHandlers = {
  unitLevelUp: (args: {
    unit: UnitType;
    prevStats: StatGrowthRateListType;
    nextStats: StatGrowthRateListType;
  }) => any;
};

export default class GameManagementService extends EventService<
  GameEventHandlers
> {
  unitClasses = new Map<string, AnyUnitClassConfigType>();
  units = new Map<string, UnitType>();
  chapters = new Map();

  testing() {
    const calypso = this.registerUnit(Units.Calypso)
      .getUnit("Calypso")
      .levelUp();
    console.log(calypso.unit);
  }

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

new GameManagementService().testing();
