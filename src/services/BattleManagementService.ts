import MapManagementService, {
  MapManagementServiceConstructor
} from "./MapManagementService";
import { ChapterGoalType } from "./ChapterCreationService";
import { Coordinates, UnitCoordinates } from "./UnitPathfindingService";

interface BattleManagementServiceConstructor
  extends MapManagementServiceConstructor {
  goal: ChapterGoalType;
  possibleStartCoordinates: Coordinates[];
}

export default class BattleManagementService {
  goal: ChapterGoalType;
  possibleStartCoordinates: Coordinates[];

  mapManager: MapManagementService;
  unitStartCoordinates: UnitCoordinates[] = [];
  numTurns = 0;
  turn: "player" | "computer";

  constructor({
    goal,
    possibleStartCoordinates,
    map,
    units
  }: BattleManagementServiceConstructor) {
    this.goal = goal;
    this.possibleStartCoordinates = possibleStartCoordinates;
    this.mapManager = new MapManagementService({ map, units });
  }

  setUnitStartCoords({ unit, coordinates }: UnitCoordinates) {
    const isValidStartingPosition = this.possibleStartCoordinates.some(
      ({ x, y }) => x === coordinates.x && y === coordinates.y
    );
    if (isValidStartingPosition) {
      this.unitStartCoordinates = this.unitStartCoordinates
        .filter(
          ({ coordinates: { x, y } }) =>
            x === coordinates.x && y === coordinates.y
        )
        .concat({ unit, coordinates });
    }
    return this;
  }

  start() {
    this.mapManager.addUnits(this.unitStartCoordinates);
  }

  private endTurn() {}

  private processEnemyTurn() {}
}
