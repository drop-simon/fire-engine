import merge from "lodash/merge";
import {
  UnitConfigType,
  UnitType,
  AnyUnitClassConfigType,
  AnyUnitType,
  CombatCategoryType
} from "../types";
import UnitCreationService from "./UnitCreationService";
import EventService from "./EventService";

type GameEventHandlers = {
  battleStart: (unit: AnyUnitType) => void;
  battleEnd: (args: { success: boolean }) => void;
};

export default class GameManagementService extends EventService<
  GameEventHandlers
> {
  unitClasses = new Map<string, AnyUnitClassConfigType>();
  units = new Map<string, AnyUnitType>();
  chapters = new Map();

  registerUnitClass<U extends AnyUnitClassConfigType>(unitClass: U) {
    this.unitClasses.set(unitClass.name, unitClass);
    return this;
  }

  registerUnit<C extends CombatCategoryType>(unitConfig: UnitConfigType<C>) {
    const unit = new UnitCreationService<C>(unitConfig).process();
    this.units.set(unitConfig.name, unit);
    return this;
  }

  updateUnit(unitName: string, updates: Partial<UnitType>) {
    const unit = this.getUnit(unitName);
    if (!unit) {
      return this;
    }
    const updatedUnit = merge(unit, updates);
    this.units.set(unitName, updatedUnit);
    return this;
  }

  getUnit(unitName: string) {
    return this.units.get(unitName);
  }

  getUnitClass(unitClassName: string) {
    return this.unitClasses.get(unitClassName);
  }
}
