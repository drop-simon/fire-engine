import { Unit } from "../types";
import UnitPathfindingService, {
  UnitCoordinates
} from "./UnitPathfindingService";
import UNITS from "../constants/units";

type ChapterGoal = {
  description: string;
  endCondition: (map: any) => boolean;
};

type ChapterGoalCreator<N extends any = any> = (data: N) => ChapterGoal;

const SURVIVE: ChapterGoalCreator<number> = (n: number) => ({
  description: `Survive ${n} turns`,
  endCondition: (map: any) => map.turn === n
});

const DEFEAT_ALL: ChapterGoal = {
  description: `Defeat all enemies`,
  endCondition: (map: any) => map.numEnemies === 0
};

const CAPTURE_GATE: ChapterGoal = {
  description: `Seize the gate`,
  endCondition: (map: any) => map.numEnemies === 0
};

const CAPTURE_THRONE: ChapterGoal = {
  description: `Seize the throne`,
  endCondition: (map: any) => map.numEnemies === 0
};

const CHAPTER_GOALS = {
  SURVIVE,
  DEFEAT_ALL,
  CAPTURE_THRONE,
  CAPTURE_GATE
} as const;

export type ChapterGoalType = keyof typeof CHAPTER_GOALS;

export type Coordinates = { x: number; y: number };

type Goal<G extends ChapterGoalType> = G extends "SURVIVE"
  ? { type: G; data: number }
  : { type: G };

interface ChapterManagementServiceConstructor<G extends ChapterGoalType> {
  map: { terrain: string[]; tileSet: string };
  goal: Goal<G>;
  unitStartingPoints: UnitCoordinates[];
  enemyStartingPoints: UnitCoordinates[];
}

export type Chapter<G extends ChapterGoalType, U extends Unit = Unit> = {
  map: { terrain: string[][]; tileSet: string };
  unitStartingPoints: UnitCoordinates<U>[];
  enemyStartingPoints: UnitCoordinates<U>[];
  goal: G extends "SURVIVE" ? { type: G; data: number } : { type: G };
  size: { width: number; height: number };
};

export default class ChapterManagementService<G extends ChapterGoalType> {
  chapter: Chapter<G>;
  pathfinders: { [key: string]: UnitPathfindingService<G> };
  pauseInteractions = true;

  constructor({
    map: { terrain, tileSet },
    unitStartingPoints,
    enemyStartingPoints,
    goal
  }: ChapterManagementServiceConstructor<G>) {
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
        const pathfinder = new UnitPathfindingService<G>({
          chapter: this.chapter,
          unit,
          coordinates
        });
        acc[unit.name] = pathfinder;
        return acc;
      },
      {} as { [key: string]: UnitPathfindingService<G> }
    );
  }
}
