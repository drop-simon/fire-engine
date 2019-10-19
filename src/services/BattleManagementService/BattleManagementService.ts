import { UnitAllegiance } from "../../types";
import MapManagementService from "../MapManagementService";
import GameManagementService from "../GameManagementService";

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

export default class BattleManagementService {
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
    this.goal = goal;
    this.mapManager = mapManager;
    this.gameManager = gameManager;
  }

  private processEnemyTurn() {}
}
