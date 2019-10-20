import sortBy from "lodash/sortBy";
import { UnitAllegiance, UnitBehavior } from "../../../types";
import BattleManagementService from "..";
import GameManagementService from "../../GameManagementService";
import { getManhattanDistance, getTargetableTiles } from "../../utils";
import { MapManagedUnit, MapTileInformation } from "../../MapManagementService";
import { Coordinates } from "../../UnitPathfindingService";
import ConflictProcessingService from "../../ConflictProcessingService";

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
    this.behaviorHandler();
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
    if (this.unitManager.weapons.length < 1) {
      this.handleSupportBehavior();
      return true;
    }

    const targetableTiles = this.pathfinder.conflictRange;
    const targetableUnits = targetableTiles.reduce(
      (acc, tile) => {
        if (!tile.unit) {
          return acc;
        }
        const { allegiance } = tile.unit.unitManager;
        const canTarget =
          (this.allegiance === "NEUTRAL" && allegiance === "ENEMY") ||
          (this.allegiance === "ENEMY" && allegiance !== "ENEMY");
        if (canTarget) {
          acc.push(tile.unit);
        }
        return acc;
      },
      [] as MapManagedUnit[]
    );

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
    if (this.handleStationaryBehavior()) {
      return false;
    }

    const attackTilesByProximity = sortBy(this.pathfinder.conflictRange, tile =>
      this.getDistanceFromUnit(tile.coordinates)
    );
    if (attackTilesByProximity.length < 1) {
      return false;
    }

    const [firstTile] = attackTilesByProximity;
    const closestPath = attackTilesByProximity.reduce((path, tile) => {
      if (path.length <= this.unitManager.unit.stats.movement) {
        return path;
      }
      const possiblePath = this.getPathToTile(tile.coordinates);
      if (possiblePath.length < path.length) {
        return possiblePath;
      }
      return path;
    }, this.getPathToTile(firstTile.coordinates));

    this.eventQueue.push({ type: "movement", payload: closestPath });
    return this.handleStationaryBehavior();
  }

  handlePassiveBehavior() {}

  handleSupportBehavior() {
    const supportWeapons = this.unitManager.equippableWeapons.filter(
      weapon => weapon.friendly
    );
    if (supportWeapons.length < 1) {
      return false;
    }

    const targetableTiles = this.pathfinder.friendlyFireRange;
    const targetableUnits = targetableTiles.reduce(
      (acc, tile) => {
        if (!tile.unit) {
          return acc;
        }
        const { allegiance } = tile.unit.unitManager;
        const canTarget =
          (this.allegiance === "NEUTRAL" && allegiance !== "ENEMY") ||
          (this.allegiance === "ENEMY" && allegiance === "ENEMY");
        if (canTarget) {
          acc.push(tile.unit);
        }
        return acc;
      },
      [] as MapManagedUnit[]
    );
    return true;
  }

  handleThiefBehavior() {
    const { chests } = this.map;
    if (chests.filter(({ isOpened }) => !isOpened).length < 1) {
      this.handleActiveBehavior();
      return false;
    }
  }

  handleSelfPreservationBehavior() {
    if (this.unitManager.items) {
    }
  }

  private get hostileUnits() {
    const { playerUnits, enemyUnits, neutralUnits } = this.map;
    return this.allegiance === "NEUTRAL"
      ? enemyUnits
      : playerUnits.concat(neutralUnits);
  }

  private get hostileUnitsByProximity() {
    return sortBy(this.hostileUnits, ({ pathfinder: { currentCoordinates } }) =>
      getManhattanDistance(
        currentCoordinates,
        this.pathfinder.currentCoordinates
      )
    );
  }

  private get alliedUnits() {
    const { playerUnits, enemyUnits, neutralUnits } = this.map;
    return this.allegiance === "NEUTRAL"
      ? playerUnits.concat(neutralUnits)
      : enemyUnits;
  }

  private goTowardsTile(coordinates: Coordinates) {
    const path = this.getPathToTile(coordinates);
    this.eventQueue.push({ type: "movement", payload: path });
    return this;
  }

  private getPathToTile(coordinates: Coordinates) {
    return this.pathfinder.getPathTo({
      start: this.pathfinder.currentCoordinates,
      end: coordinates
    });
  }

  private getDistanceFromUnit(coordinates: Coordinates) {
    return getManhattanDistance(
      this.pathfinder.currentCoordinates,
      coordinates
    );
  }
}
