import sortBy from "lodash/sortBy";
import range from "lodash/range";
import { UnitAllegiance, UnitBehavior } from "../../../types";
import BattleManagementService from "..";
import GameManagementService from "../../GameManagementService";
import { getManhattanDistance } from "../../utils";
import { MapManagedUnit, MapTileInformation } from "../../MapManagementService";
import { Coordinates } from "../../UnitPathfindingService";
import EventEmitterService from "../../EventEmitterService";
import ConflictProcessingService from "../../ConflictProcessingService";

type PathToUnit = { path: MapTileInformation[]; unit: MapManagedUnit };

interface UnitBehaviorServiceConstructor
  extends EventEmitterService<{
    movement: (path: MapTileInformation[]) => void;
  }> {
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
      case "SUPPORT":
        return this.handleSupportBehavior;
      case "THIEF":
        return this.handleThiefBehavior;
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

  get unit() {
    return this.mapManagedUnit.unitManager;
  }

  handleStationaryBehavior() {
    const targetableTiles = this.getTargetableTilesFromCoordinates(
      this.pathfinder.currentCoordinates
    );
    const hostileUnit = this.hostileUnits.find(hostileUnit =>
      targetableTiles.some(({ coordinates }) =>
        this.pathfinder.compareCoordinates(
          coordinates,
          hostileUnit.pathfinder.currentCoordinates
        )
      )
    );
    if (hostileUnit) {
      const result = new ConflictProcessingService({
        aggressor: this.mapManagedUnit,
        defender: hostileUnit
      }).process();
      this.eventQueue.push({
        eventName: "conflict",
        payload: result
      });
      return true;
    }
    return false;
  }

  handleActiveBehavior() {
    const didHandleStationaryBehavior = this.handleStationaryBehavior();
    if (didHandleStationaryBehavior) {
      return false;
    }

    const { attackTilesByProximity } = this;
    if (attackTilesByProximity.length < 1) {
      return false;
    }

    const [firstTile] = attackTilesByProximity;
    const closestPath = attackTilesByProximity.reduce((path, tile) => {
      if (path.length <= this.unit.unit.stats.movement) {
        return path;
      }
      const possiblePath = this.getPathToTile(tile.coordinates);
      if (possiblePath.length < path.length) {
        return possiblePath;
      }
      return path;
    }, this.getPathToTile(firstTile.coordinates));

    this.eventQueue.push({ type: "movement", payload: closestPath });
    this.handleStationaryBehavior();
    return true;
  }

  handlePassiveBehavior() {}

  handleSupportBehavior() {}

  handleThiefBehavior() {
    const { chests } = this.map;
    if (chests.filter(({ isOpened }) => !isOpened).length < 1) {
      this.handleActiveBehavior();
      return false;
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

  private getTargetableTilesFromCoordinates(coordinates: Coordinates) {
    const { attackRange } = this.unit;
    const [minRange, maxRange] = attackRange;
    if (minRange === Infinity || maxRange === -Infinity) {
      return [];
    }
    return this.map.getMapTileInfo(this.unit.unit).filter(tile => {
      const distance = getManhattanDistance(tile.coordinates, coordinates);
      return distance <= maxRange && distance >= minRange;
    });
  }

  private get attackTiles() {
    const { attackRange } = this.unit;
    const [minRange, maxRange] = attackRange;

    const list: MapTileInformation[] = [];
    if (minRange === Infinity || maxRange === -Infinity) {
      return list;
    }

    const applicableMapTiles = this.map
      .getMapTileInfo(this.unit.unit)
      .filter(tile => {
        const canTraverseTile =
          tile.terrain.calculated.movementCost <= this.unit.unit.stats.movement;

        if (!canTraverseTile) {
          return false;
        }

        return this.hostileUnits.some(hostileUnit => {
          const distanceFromTile = getManhattanDistance(
            tile.coordinates,
            hostileUnit.pathfinder.currentCoordinates
          );
          const canAttackHostileUnitFromTile =
            distanceFromTile <= maxRange && distanceFromTile >= minRange;

          return canAttackHostileUnitFromTile;
        });
      });

    list.push(...applicableMapTiles);

    return list;
  }

  private get attackTilesByProximity() {
    return sortBy(this.attackTiles, tile =>
      this.getDistanceFromUnit(tile.coordinates)
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
