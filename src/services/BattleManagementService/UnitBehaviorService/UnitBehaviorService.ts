import { Unit, UnitAllegiance, UnitBehavior } from "../../../types";
import BattleManagementService from "..";
import { TerrainWithKey } from "../UnitPathfindingService";
import GameManagementService from "../../GameManagementService";

type PathToUnit = { path: TerrainWithKey[]; unit: Unit };

interface UnitBehaviorServiceConstructor {
  unit: Unit;
  allegiance: Exclude<UnitAllegiance, "PLAYER">;
  behavior: UnitBehavior;
  battleManager: BattleManagementService;
  gameManager: GameManagementService;
}

export default class UnitBehaviorService {
  unit: Unit;
  behavior: UnitBehavior;
  allegiance: Exclude<UnitAllegiance, "PLAYER">;
  battleManager: BattleManagementService;
  gameManager: GameManagementService;

  actionQueue: any[] = [];

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
      default:
    }
  }

  get pathfinder() {
    return this.battleManager.mapManager.pathfinders[this.unit.name];
  }

  get hostileUnits() {
    const {
      playerUnits,
      enemyUnits,
      neutralUnits
    } = this.battleManager.mapManager;
    return this.allegiance === "NEUTRAL"
      ? enemyUnits
      : playerUnits.concat(neutralUnits);
  }

  get alliedUnits() {
    const {
      playerUnits,
      enemyUnits,
      neutralUnits
    } = this.battleManager.mapManager;
    return this.allegiance === "NEUTRAL"
      ? playerUnits.concat(neutralUnits)
      : enemyUnits;
  }

  getPathToNearestHostileUnit() {
    return this.hostileUnits.reduce(
      (acc, hostileUnit) => {
        const path = this.pathfinder.getPathTo({
          start: this.pathfinder.currentCoordinates,
          end: hostileUnit.coordinates
        });
        if (acc === null || path.length < acc.path.length) {
          return { path, unit: hostileUnit.unit };
        }
        return acc;
      },
      null as PathToUnit
    );
  }

  handleStationaryBehavior() {}

  handleActiveBehavior() {
    const pathToNearestHostileUnit = this.getPathToNearestHostileUnit();
    if (pathToNearestHostileUnit) {
      const { path, unit } = pathToNearestHostileUnit;
      this.actionQueue.push({ type: "UNIT_MOVEMENT", payload: { path, unit } });
    }
  }

  handlePassiveBehavior() {}

  handleSupportBehavior() {}

  handleThiefBehavior() {
    const { chests } = this.battleManager.mapManager;
    if (chests.filter(({ isOpened }) => !isOpened).length < 1) {
      return this.handleActiveBehavior();
    }
  }
}
