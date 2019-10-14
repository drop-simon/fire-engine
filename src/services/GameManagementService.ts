import merge from "lodash/merge";
import { UnitClass, CombatCategory, UnitConfig, Unit } from "../types";
import UnitCreationService from "./UnitCreationService";
import EventService from "./EventService";

type GameEventHandlers = {
  battleStart: (unit: Unit) => void;
  battleEnd: (args: { success: boolean }) => void;
};

export default class GameManagementService extends EventService<
  GameEventHandlers
> {
  unitClasses = new Map<string, UnitClass>();
  units = new Map<string, Unit>();
  chapters = new Map();

  registerUnitClass<C extends CombatCategory>(unitClass: UnitClass<C>) {
    this.unitClasses.set(unitClass.name, unitClass);
    return unitClass;
  }

  registerUnit<C extends CombatCategory, U extends UnitClass<C>>(
    unitConfig: UnitConfig<C, U>
  ) {
    const unit = new UnitCreationService(unitConfig).process();
    this.units.set(unitConfig.name, unit);
    return unit;
  }

  updateUnit(unitName: string, updates: Partial<Unit>) {
    const unit = this.getUnit(unitName);
    if (!unit) {
      return null;
    }
    const updatedUnit = merge(unit, updates);
    this.units.set(unitName, updatedUnit);
    return updatedUnit;
  }

  getUnit(unitName: string) {
    return this.units.get(unitName);
  }

  getUnitClass(unitClassName: string) {
    return this.unitClasses.get(unitClassName);
  }
}
