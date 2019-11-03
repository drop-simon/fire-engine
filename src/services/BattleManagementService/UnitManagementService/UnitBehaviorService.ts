import sortBy from "lodash/sortBy";
import last from "lodash/last";
import { UnitAllegiance, UnitBehavior } from "../../../types";
import BattleManagementService from "..";
import GameManagementService from "../../GameManagementService";
import { getManhattanDistance } from "../../utils";
import { MapManagedUnit, MapTileInformation } from "../../MapManagementService";
import { Coordinates } from "../../UnitPathfindingService";
import ConflictProcessingService from "../../ConflictProcessingService";
import {
  compareConflictStats,
  areUnitsAllied,
  getTerrainSafety
} from "./utils";

interface UnitBehaviorServiceConstructor {
  mapManagedUnit: MapManagedUnit;
  allegiance: Exclude<UnitAllegiance, "PLAYER">;
  behavior: UnitBehavior;
  battleManager: BattleManagementService;
  gameManager: GameManagementService;
}

export default class UnitBehaviorService {
  mapManagedUnit: MapManagedUnit;
  behavior: UnitBehavior;
  allegiance: Exclude<UnitAllegiance, "PLAYER">;
  battleManager: BattleManagementService;
  gameManager: GameManagementService;

  constructor({
    mapManagedUnit,
    behavior,
    allegiance,
    battleManager,
    gameManager
  }: UnitBehaviorServiceConstructor) {
    this.mapManagedUnit = mapManagedUnit;
    this.behavior = behavior;
    this.battleManager = battleManager;
    this.allegiance = allegiance;
    this.gameManager = gameManager;
  }

  process() {
    if (!this.handleSelfPreservation()) {
      this.behaviorHandler();
    }
  }

  private get behaviorHandler() {
    switch (this.behavior) {
      case "ACTIVE":
        return this.handleActiveBehavior;
      case "PASSIVE":
        return this.handlePassiveBehavior;
      case "STATIONARY":
        return this.handleStationaryBehavior;
      default:
        return this.handleStationaryBehavior;
    }
  }

  get mapManager() {
    return this.battleManager.mapManager;
  }

  get pathfinder() {
    return this.mapManagedUnit.pathfinder;
  }

  get unitManager() {
    return this.mapManagedUnit.unitManager;
  }

  handleStationaryBehavior() {}

  handleActiveBehavior() {
    const nearestEnemy = this.pathfinder.nearestEnemy;
    if (!nearestEnemy) {
      console.log("no enemy to target");
      return;
    }

    // get nearest tile nearestEnemy can be attacked from
    const pathToTile = this.pathfinder
      .getAttackableTilesFromCoordinates(
        nearestEnemy.pathfinder.currentCoordinates
      )
      .reduce(
        (acc, tile) => {
          if (acc && acc.length < 2) {
            return acc;
          }

          const path = this.pathfinder.getPathTo({ end: tile.coordinates });
          if (!path) {
            return acc;
          }

          if (!acc || (path.length > 0 && path.length < acc.length)) {
            return path;
          }

          return acc;
        },
        null as MapTileInformation[]
      );

    if (!pathToTile) {
      console.log("no path");
      return;
    }

    this.mapManager.moveUnit(this.mapManagedUnit, pathToTile);

    const target = this.pathfinder
      .getAttackableTilesFromCoordinates(this.pathfinder.currentCoordinates)
      .find(tile => tile.unit);

    if (!target) {
      console.log("no target");
      return;
    }

    this.mapManager.conflict({
      defender: target.unit,
      aggressor: this.mapManagedUnit
    });
  }

  handlePassiveBehavior() {}

  handleSupportBehavior() {}

  handleThiefBehavior() {}

  handleSelfPreservation() {
    const { healingItems, damageTaken } = this.unitManager;
    const itemToUse = healingItems[0];

    if (!itemToUse || damageTaken < 10) {
      return false;
    }

    this.mapManager.unitUseItem(this.mapManagedUnit, itemToUse);
    return true;
  }
}
