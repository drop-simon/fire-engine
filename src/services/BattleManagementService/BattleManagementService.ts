import { UnitAllegiance } from "../../types";
import MapManagementService from "../MapManagementService";
import GameManagementService from "../GameManagementService";
import EventEmitterService from "../EventEmitterService";

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

  constructor({
    goal,
    gameManager,
    mapManager
  }: BattleManagementServiceConstructor) {
    super();
    this.goal = goal;
    this.mapManager = mapManager;
    this.gameManager = gameManager;
  }

  start() {
    this.processPlayerTurn();
  }

  private processPlayerTurn() {
    this.emit("playerTurn");
    this.processEnemyTurn();
  }

  private processEnemyTurn() {
    this.emit("enemyTurn");
  }
}
