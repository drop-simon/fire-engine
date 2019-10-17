import { UnitAllegiance, UnitBehavior, Unit } from "../../types";
import MapManagementService, { MapConfigType } from "../MapManagementService";
import { UnitCoordinates } from "./UnitPathfindingService";
import GameManagementService from "../GameManagementService";
import BattleUnitManagementService from "./BattleUnitManagementService";

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

  get units() {
    return this.mapManager.units.map(
      unit =>
        new BattleUnitManagementService({
          ...unit,
          gameManager: this.gameManager
        })
    );
  }

  private processEnemyTurn() {}
}
