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

  eventQueue: any[] = [];

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
    this.eventQueue = [];
    if (!this.handleSelfPreservation()) {
      this.behaviorHandler();
    }
    return this.eventQueue;
  }

  get behaviorHandler() {
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

  get battle() {
    return this.battleManager;
  }

  get map() {
    return this.battleManager.mapManager;
  }

  get pathfinder() {
    return this.mapManagedUnit.pathfinder;
  }

  get unitManager() {
    return this.mapManagedUnit.unitManager;
  }

  handleStationaryBehavior() {
    if (this.unitManager.equippableAttackWeapons.length < 1) {
      return true;
    }

    const { attackRanges } = this.unitManager;
    const targetableUnits = this.pathfinder.attackableTiles
      .filter(tile => {
        if (!tile.unit) {
          return false;
        }

        const distance = getManhattanDistance(
          tile.coordinates,
          this.pathfinder.currentCoordinates
        );
        return attackRanges.some(
          ([min, max]) => distance <= max && distance >= min
        );
      })
      .map(({ unit }) => unit);

    const target = targetableUnits[0];
    if (!target) {
      return false;
    }

    const result = new ConflictProcessingService({
      aggressor: this.mapManagedUnit,
      defender: target
    }).process();
    this.eventQueue.push({
      eventName: "conflict",
      payload: result
    });
    return true;
  }

  handleActiveBehavior() {
    const attackableUnits = this.pathfinder.attackableTiles
      .filter(
        tile =>
          tile.unit &&
          !areUnitsAllied(
            tile.unit.unitManager,
            this.mapManagedUnit.unitManager
          )
      )
      .map(({ unit }) => unit);

    const target = sortBy(
      attackableUnits,
      unit =>
        compareConflictStats({
          aggressor: this.mapManagedUnit,
          defender: unit
        }),
      "desc"
    )[0];

    if (!target) {
      return this.handleSupportBehavior();
    }

    const { attackRanges } = this.unitManager;
    const possibleTiles = this.pathfinder.walkableTiles.filter(tile => {
      const distance = getManhattanDistance(
        tile.coordinates,
        target.pathfinder.currentCoordinates
      );
      return attackRanges.some(
        ([min, max]) => distance <= max && distance >= min
      );
    });
    const targetTile = sortBy(
      possibleTiles,
      tile => getTerrainSafety(tile.terrain),
      "desc"
    )[0];

    const pathToTile = this.getPathToTile(targetTile.coordinates);
    if (!pathToTile) {
      return this.handleStationaryBehavior();
    }

    this.eventQueue.push({ type: "movement", payload: pathToTile });
    return this.handleStationaryBehavior();
  }

  handlePassiveBehavior() {}

  handleSupportBehavior() {
    const attackableUnits = this.pathfinder.friendlyFireTiles
      .filter(
        tile =>
          tile.unit &&
          areUnitsAllied(tile.unit.unitManager, this.mapManagedUnit.unitManager)
      )
      .map(({ unit }) => unit);

    const target = sortBy(
      attackableUnits,
      unit => unit.unitManager.calculatedStats.health
    )[0];

    if (!target) {
      return this.handleStationaryBehavior();
    }

    const { supportRanges } = this.unitManager;
    const possibleTiles = this.pathfinder.walkableTiles.filter(tile => {
      const distance = getManhattanDistance(
        tile.coordinates,
        target.pathfinder.currentCoordinates
      );
      return supportRanges.some(
        ([min, max]) => distance <= max && distance >= min
      );
    });
    const targetTile = sortBy(
      possibleTiles,
      tile => getTerrainSafety(tile.terrain),
      "desc"
    )[0];

    const pathToTile = this.getPathToTile(targetTile.coordinates);
    if (!pathToTile) {
      return this.handleStationaryBehavior();
    }

    this.eventQueue.push({ type: "movement", payload: pathToTile });
  }

  handleThiefBehavior() {
    const unopenedChests = this.map.chests.filter(({ isOpened }) => !isOpened);
    const shortestPathToChest = unopenedChests.reduce(
      (acc, { coordinates }) => {
        const path = this.getPathToTile(coordinates);
        if (!path || path.length === 0) {
          return acc;
        }
        if (acc === null || path.length < acc.length) {
          return path;
        }
      },
      null as MapTileInformation[]
    );
    if (!shortestPathToChest) {
      return this.handleActiveBehavior();
    }

    this.eventQueue.push({ type: "movement", payload: shortestPathToChest });

    const { chest } = last(shortestPathToChest);
    if (chest && !chest.isOpened) {
      this.eventQueue.push({
        type: "chestPilfered",
        payload: chest
      });
    }

    return true;
  }

  handleSelfPreservation() {
    const { healingItems, damageTaken } = this.unitManager;
    const itemToUse = healingItems[0];

    if (!itemToUse || damageTaken < 10) {
      return false;
    }

    this.eventQueue.push({ type: "itemUsed", payload: itemToUse });
    return true;
  }

  private getPathToTile(coordinates: Coordinates) {
    return this.pathfinder.getPathTo({
      start: this.pathfinder.currentCoordinates,
      end: coordinates
    });
  }
}
