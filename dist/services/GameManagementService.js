import merge from "lodash/merge";
import UnitCreationService from "./UnitCreationService";
export default class GameManagementService {
    constructor() {
        this.unitClasses = new Map();
        this.units = new Map();
        this.chapters = new Map();
        this.eventListeners = {
            chapterStart: [],
            battleStart: [],
            levelUp: [],
            battleEnd: [],
            chapterEnd: [],
            save: [],
            quit: []
        };
    }
    registerUnitClass(unitClass) {
        this.unitClasses.set(unitClass.name, unitClass);
        return unitClass;
    }
    registerUnit(unitConfig) {
        const unit = new UnitCreationService(unitConfig).process();
        this.units.set(unitConfig.name, unit);
        return unit;
    }
    updateUnit(unitName, updates) {
        const unit = this.getUnit(unitName);
        if (!unit) {
            return null;
        }
        const updatedUnit = merge(unit, updates);
        this.units.set(unitName, updatedUnit);
        return updatedUnit;
    }
    getUnit(unitName) {
        return this.units.get(unitName);
    }
    getUnitClass(unitClassName) {
        return this.unitClasses.get(unitClassName);
    }
    addEventListener(eventName, eventHandler) {
        this.eventListeners[eventName].push(eventHandler);
        return this;
    }
    removeEventListener(eventName, eventHandler) {
        this.eventListeners[eventName] = this.eventListeners[eventName].filter(handler => handler !== eventHandler);
        return this;
    }
    emit(eventName, data) {
        this.eventListeners[eventName].forEach(handler => handler(data));
    }
}
//# sourceMappingURL=GameManagementService.js.map