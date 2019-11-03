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

  get enemyUnits() {
    return this.mapManager.units.filter(
      unit => !areUnitsAllied(unit.unitManager, this.unitManager)
    );
  }

  get alliedUnits() {
    return this.mapManager.units.filter(unit =>
      areUnitsAllied(unit.unitManager, this.unitManager)
    );
  }

  handleStationaryBehavior() {}

  handleActiveBehavior() {
    const enemiesSortedByStrength = sortBy(
      this.enemyUnits,
      unit =>
        compareConflictStats({
          aggressor: this.mapManagedUnit,
          defender: unit
        }),
      "desc"
    );
    const target = enemiesSortedByStrength[0];
    if (!target) {
      console.log("no target");
      return;
    }

    const { attackRanges } = this.unitManager;
    const possibleAttackSourceTiles = this.pathfinder.processedTiles.filter(
      tile => {
        const distanceFromTarget = getManhattanDistance(
          target.pathfinder.currentCoordinates,
          tile.coordinates
        );
        return attackRanges.some(
          ([min, max]) => distanceFromTarget >= min && distanceFromTarget <= max
        );
      }
    );

    if (possibleAttackSourceTiles.length < 1) {
      console.log("Cant find path to tile to attack target from");
      return;
    }

    const targetTile = sortBy(
      possibleAttackSourceTiles,
      tile => getTerrainSafety(tile.terrain),
      "desc"
    )[0];

    const pathToTile = this.getPathToTile(targetTile.coordinates);
    if (!pathToTile) {
      console.log("no path");
      return;
    }

    console.log("moving to coords");
    this.mapManager.moveUnit(this.mapManagedUnit, pathToTile);

    if (
      this.pathfinder.compareCoordinates(
        last(pathToTile).coordinates,
        targetTile.coordinates
      )
    ) {
      const target = this.pathfinder.attackableEnemiesFromCurrentCoordinates[0];
      if (!target) {
        console.log("no target");
        return;
      }

      this.mapManager.conflict({
        defender: target,
        aggressor: this.mapManagedUnit
      });
    }
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

  private getPathToTile(coordinates: Coordinates) {
    return this.pathfinder.getPathTo({
      end: coordinates
    });
  }
}
