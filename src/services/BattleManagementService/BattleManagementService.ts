import { UnitAllegiance } from "../../types";
import MapManagementService, { MapManagedUnit } from "../MapManagementService";
import GameManagementService from "../GameManagementService";
import EventEmitterService from "../EventEmitterService";
import UnitBehaviorService from "./UnitManagementService/UnitBehaviorService";
import { Coordinates } from "../UnitPathfindingService";

type BattleGoalType = {
  description: string;
  endCondition: (map: any) => boolean;
  failCondition: (map: any) => boolean;
};

interface BattleManagementServiceConstructor {
  goal: BattleGoalType;
  gameManager: GameManagementService;
  mapManager: MapManagementService;
}

type BattleEvents = {
  playerTurn: () => void;
  enemyTurn: () => void;
};

export default class BattleManagementService extends EventEmitterService<
  BattleEvents
> {
  goal: BattleGoalType;
  mapManager: MapManagementService;
  gameManager: GameManagementService;
  numTurns = 0;
  turn: UnitAllegiance;
  actionQueue: any[] = [];
  unitBehaviors: UnitBehaviorService[] = [];

  constructor({
    goal,
    gameManager,
    mapManager
  }: BattleManagementServiceConstructor) {
    super();
    this.goal = goal;
    this.mapManager = mapManager;
    this.gameManager = gameManager;
    this.mapManager.addEventListener("addUnits", units =>
      units.forEach(this.addUnitBehavior)
    );
  }

  get map() {
    return this.mapManager.map;
  }

  get units() {
    return this.mapManager.units;
  }

  get playerUnits() {
    return this.mapManager.playerUnits;
  }

  get enemyUnits() {
    return this.mapManager.enemyUnits;
  }

  get neutralUnits() {
    return this.mapManager.neutralUnits;
  }

  addUnitBehavior = (unit: MapManagedUnit) => {
    if (unit.allegiance === "PLAYER") {
      return;
    }

    const behavior = unit.unitManager.behavior || "PASSIVE";

    this.unitBehaviors.push(
      new UnitBehaviorService({
        mapManagedUnit: unit,
        behavior,
        gameManager: this.gameManager,
        allegiance: unit.allegiance,
        battleManager: this
      })
    );

    return this;
  };

  removeUnitBehavior(coords: Coordinates) {
    this.unitBehaviors = this.unitBehaviors.filter(
      ({ pathfinder: { currentCoordinates, compareCoordinates } }) =>
        !compareCoordinates(coords, currentCoordinates)
    );
    return this;
  }

  getUnitBehaviorFromCoordinates(coords: Coordinates) {
    return this.unitBehaviors.find(
      ({ pathfinder: { currentCoordinates, compareCoordinates } }) =>
        compareCoordinates(coords, currentCoordinates)
    );
  }

  start() {
    this.processPlayerTurn();
  }

  private processPlayerTurn() {
    this.emit("playerTurn");
  }

  private processEnemyTurn() {
    this.emit("enemyTurn");
  }

  private endTurn() {}
}
