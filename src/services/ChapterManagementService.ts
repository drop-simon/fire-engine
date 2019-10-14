import { UnitType } from "../types";
import UnitPathfindingService, {
  UnitCoordinates
} from "./UnitPathfindingService";
import UNITS from "../constants/units";

type ChapterGoalType = {
  description: string;
  endCondition: (map: any) => boolean;
  failCondition: (map: any) => boolean;
};

interface ChapterManagementServiceConstructor {
  map: { terrain: string[]; tileSet: string };
  goal: ChapterGoalType;
  unitStartingPoints: UnitCoordinates[];
  enemyStartingPoints: UnitCoordinates[];
}

export type Chapter = {
  map: { terrain: string[][]; tileSet: string };
  unitStartingPoints: UnitCoordinates[];
  enemyStartingPoints: UnitCoordinates[];
  goal: ChapterGoalType;
  size: { width: number; height: number };
};

export default class ChapterManagementService<G extends ChapterGoalType> {
  chapter: Chapter;
  pathfinders: { [key: string]: UnitPathfindingService };
  pauseInteractions = true;

  constructor({
    map: { terrain, tileSet },
    unitStartingPoints,
    enemyStartingPoints,
    goal
  }: ChapterManagementServiceConstructor) {
    this.chapter = {
      map: {
        terrain: terrain.map(row => row.split("")),
        tileSet
      },
      size: {
        height: terrain.length - 1,
        width: terrain[0].length - 1
      },
      unitStartingPoints,
      enemyStartingPoints,
      goal
    };
    this.pathfinders = unitStartingPoints.reduce(
      (acc, { unit, coordinates }) => {
        const pathfinder = new UnitPathfindingService({
          chapter: this.chapter,
          unit,
          coordinates
        });
        acc[unit.name] = pathfinder;
        return acc;
      },
      {} as { [key: string]: UnitPathfindingService }
    );
  }
}
