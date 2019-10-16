import {
  UnitType,
  UnitAllegianceType,
  UnitBehaviorType,
  ManagedUnitType
} from "../types";
import BattleManagementService from "./BattleManagementService";
import { TerrainWithKey, UnitCoordinates } from "./UnitPathfindingService";
import UnitManagementService from "./UnitManagementService";
import GameManagementService from "./GameManagementService";

type PathToUnit = { path: TerrainWithKey[]; unit: UnitType };

interface UnitBehaviorServiceConstructor {
  unit: UnitType;
  allegiance: UnitAllegianceType;
  behavior: UnitBehaviorType;
  battleManager: BattleManagementService;
  gameManager: GameManagementService;
}

export default class UnitBehaviorService {
  unit: UnitType;
  behavior: UnitBehaviorType;
  allegiance: UnitAllegianceType;
  battleManager: BattleManagementService;
  gameManager: GameManagementService;
  constructor({
    unit,
    behavior,
    allegiance,
    battleManager,
    gameManager
  }: UnitBehaviorServiceConstructor) {
    this.unit = unit;
    this.behavior = behavior;
    this.battleManager = battleManager;
    this.allegiance = allegiance;
    this.gameManager = gameManager;
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

  get managedUnit() {
    return new UnitManagementService({
      unit: this.unit,
      gameManager: this.gameManager
    });
  }

  getPathToNearestHostileUnit(
    sortFunction?: (
      unitA: UnitCoordinates,
      unitB: UnitCoordinates
    ) => -1 | 0 | 1
  ) {
    const { playerUnits, enemyUnits, neutralUnits } = this.battleManager;

    let hostileUnits =
      this.allegiance === "PLAYER" || this.allegiance === "NEUTRAL"
        ? enemyUnits
        : playerUnits.concat(neutralUnits);
    if (sortFunction) {
      hostileUnits = [...hostileUnits].sort(sortFunction);
    }

    return hostileUnits.reduce(
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
  }

  handleStationaryBehavior() {}

  handlePassiveBehavior() {}

  handleActiveBehavior() {
    const actionQueue: any[] = [];
    // if () {

    // }

    const pathToNearestHostileUnit = this
      .getPathToNearestHostileUnit
      //   (unitA, unitB) => {
      //     const managedA = new UnitManagementService({ unit: unitA.unit, gameManager: this.gameManager })
      //     const managedB = new UnitManagementService({ unit: unitB.unit, gameManager: this.gameManager })

      //   }
      ();

    if (pathToNearestHostileUnit) {
      const { path, unit } = pathToNearestHostileUnit;
      actionQueue.push({ type: "UNIT_MOVEMENT", payload: { path, unit } });
    }

    return actionQueue;
  }

  handleSupportBehavior() {}

  handleThiefBehavior() {}
}
