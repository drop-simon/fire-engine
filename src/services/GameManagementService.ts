import merge from "lodash/merge";
import { UnitClass, CombatCategory, UnitConfig, Unit } from "../types";
import UnitCreationService from "./UnitCreationService";

type GameEventHandlers = {
  chapterStart: (data?: any) => void;
  battleStart: (data?: any) => void;
  levelUp: (data?: any) => void;
  battleEnd: (data?: any) => void;
  chapterEnd: (data?: any) => void;
  save: (data?: any) => void;
  quit: (data?: any) => void;
};

type GameEventName = keyof GameEventHandlers;

type GameEventHandler<T extends GameEventName> = GameEventHandlers[T];

export default class GameManagementService {
  unitClasses = new Map<string, UnitClass>();
  units = new Map<string, Unit>();
  chapters = new Map();
  eventListeners = {
    chapterStart: [] as GameEventHandlers["chapterStart"][],
    battleStart: [] as GameEventHandlers["battleStart"][],
    levelUp: [] as GameEventHandlers["levelUp"][],
    battleEnd: [] as GameEventHandlers["battleEnd"][],
    chapterEnd: [] as GameEventHandlers["chapterEnd"][],
    save: [] as GameEventHandlers["save"][],
    quit: [] as GameEventHandlers["quit"][]
  };

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

  addEventListener<G extends GameEventName>(
    eventName: G,
    eventHandler: GameEventHandler<G>
  ) {
    this.eventListeners[eventName].push(eventHandler);
    return this;
  }

  removeEventListener<G extends GameEventName>(
    eventName: G,
    eventHandler: GameEventHandler<G>
  ) {
    this.eventListeners[eventName] = this.eventListeners[eventName].filter(
      handler => handler !== eventHandler
    );
    return this;
  }

  emit(eventName: GameEventName, data?: any) {
    this.eventListeners[eventName].forEach(handler => handler(data));
  }
}
