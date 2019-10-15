import { UnitType, UnitAllegianceType, UnitBehaviorType } from "../types";
import BattleManagementService from "./BattleManagementService";
import { TerrainWithKey } from "./UnitPathfindingService";

type PathToUnit = { path: TerrainWithKey[]; unit: UnitType };

interface UnitBehaviorServiceConstructor {
  unit: UnitType;
  allegiance: UnitAllegianceType;
  behavior: UnitBehaviorType;
  battleManager: BattleManagementService;
}

export default class UnitBehaviorService {
  unit: UnitType;
  behavior: UnitBehaviorType;
  allegiance: UnitAllegianceType;
  battleManager: BattleManagementService;
  constructor({
    unit,
    behavior,
    allegiance,
    battleManager
  }: UnitBehaviorServiceConstructor) {
    this.unit = unit;
    this.behavior = behavior;
    this.battleManager = battleManager;
    this.allegiance = allegiance;
  }

  process() {}

  get behaviorHandler() {
    switch (this.behavior) {
      case "ACTIVE":
        return this.handleActiveBehavior;
      case "PASSIVE":
        return this.handlePassiveBehavior;
      case "STATIONARY":
        return this.handleStationaryBehavior;
      case "SUPPORT":
        return this.handleSupportBehavior;
      case "THIEF":
        return this.handleThiefBehavior;
      case "PASSIVE":
        return this.handlePassiveBehavior;
      default:
        return this.handlePassiveBehavior;
    }
  }

  get pathfinder() {
    return this.battleManager.mapManager.pathfinders[this.unit.name];
  }

  getPathToNearestHostileUnit() {
    const { playerUnits, enemyUnits, neutralUnits } = this.battleManager;

    const hostileUnits =
      this.allegiance === "PLAYER" || this.allegiance === "NEUTRAL"
        ? enemyUnits
        : playerUnits.concat(neutralUnits);

    const hostileUnit = hostileUnits.reduce(
      (acc, hostileUnit) => {
        const path = this.pathfinder.getPathTo({
          start: this.pathfinder.currentCoordinates,
          end: hostileUnit.coordinates
        });
        if (acc === null || path.length > acc.path.length) {
          return { path, unit: hostileUnit.unit };
        }
        return acc;
      },
      null as PathToUnit
    );

    return hostileUnit;
  }

  handleStationaryBehavior() {}

  handlePassiveBehavior() {}

  handleActiveBehavior() {}

  handleSupportBehavior() {}

  handleThiefBehavior() {}
}
