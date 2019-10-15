import { UnitAllegianceType, UnitBehaviorType } from "../types";
import MapManagementService, { MapConfigType } from "./MapManagementService";
import { ChapterGoalType } from "./ChapterCreationService";
import { Coordinates, UnitCoordinates } from "./UnitPathfindingService";

interface BattleManagementServiceConstructor {
  map: MapConfigType;
  goal: ChapterGoalType;
  enemyUnits: UnitCoordinates[];
  playerUnits: UnitCoordinates[];
  neutralUnits?: UnitCoordinates[];
}

export default class BattleManagementService {
  goal: ChapterGoalType;
  mapManager: MapManagementService;
  enemyUnits: UnitCoordinates[] = [];
  playerUnits: UnitCoordinates[] = [];
  neutralUnits: UnitCoordinates[] = [];
  numTurns = 0;
  turn: UnitAllegianceType;

  constructor({
    goal,
    map,
    enemyUnits,
    playerUnits,
    neutralUnits = []
  }: BattleManagementServiceConstructor) {
    this.goal = goal;
    this.mapManager = new MapManagementService({ map, units: enemyUnits });
    this.playerUnits = playerUnits;
    this.enemyUnits = enemyUnits;
    this.neutralUnits = neutralUnits;
  }

  private endTurn() {}

  private processEnemyTurn() {}

  private addUnit({
    unit,
    coordinates,
    allegiance,
    behavior
  }: UnitCoordinates & {
    behavior: UnitBehaviorType;
    allegiance: UnitAllegianceType;
  }) {}
}
