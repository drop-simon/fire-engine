import { UnitAllegianceType, UnitBehaviorType, UnitType } from "../../types";
import MapManagementService, { MapConfigType } from "../MapManagementService";
import { ChapterGoalType } from "../ChapterCreationService";
import { UnitCoordinates, Coordinates } from "../UnitPathfindingService";
import GameManagementService from "../GameManagementService";

interface BattleManagementServiceConstructor {
  map: MapConfigType;
  goal: ChapterGoalType;
  enemyUnits: UnitCoordinates[];
  playerUnits: UnitCoordinates[];
  neutralUnits?: UnitCoordinates[];
  gameManager: GameManagementService;
}

export default class BattleManagementService {
  goal: ChapterGoalType;
  mapManager: MapManagementService;
  enemyUnits: UnitCoordinates[] = [];
  playerUnits: UnitCoordinates[] = [];
  neutralUnits: UnitCoordinates[] = [];
  chests: { coordinates: Coordinates; isOpened?: false }[] = [];
  numTurns = 0;
  turn: UnitAllegianceType;
  actionQueue: any[] = [];

  constructor({
    goal,
    map,
    enemyUnits,
    playerUnits,
    neutralUnits = [],
    gameManager
  }: BattleManagementServiceConstructor) {
    this.goal = goal;
    this.mapManager = new MapManagementService({
      map,
      units: enemyUnits,
      gameManager
    });
    this.playerUnits = playerUnits;
    this.enemyUnits = enemyUnits;
    this.neutralUnits = neutralUnits;
  }

  get units() {
    return [...this.playerUnits, ...this.neutralUnits, ...this.enemyUnits];
  }

  getTileInformation({ x, y }: Coordinates) {
    const unitAtCoords = this.units.find(
      ({ coordinates }) => coordinates.x === x && coordinates.y === y
    );
    const tileAtCoords = this.mapManager.getTileAtCoordinates({ x, y });

    return {
      tile: tileAtCoords,
      unit: unitAtCoords
    };
  }

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
