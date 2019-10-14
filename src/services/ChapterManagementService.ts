import ConflictManagementService from "./ConflictManagementService";
import MapManagementService, { MapConfigType } from "./MapManagementService";
import { UnitType } from "../types";
import GameManagementService from "./GameManagementService";
import DialogueManagementService from "./DialogueManagementService";
import BattleManagementService from "./BattleManagementService";

export type ChapterGoalType = {
  description: string;
  endCondition: (map: any) => boolean;
  failCondition: (map: any) => boolean;
};

interface ChapterManagementServiceConstructor {
  goal: ChapterGoalType;
  gameManager: GameManagementService;
}

export type ChapterType = {
  goal: ChapterGoalType;
};

type Scene = DialogueManagementService | BattleManagementService;

export default class ChapterManagementService {
  gameManager: GameManagementService;
  goal: ChapterGoalType;
  queue: Scene[];

  constructor({ goal, gameManager }: ChapterManagementServiceConstructor) {
    this.gameManager = gameManager;
    this.goal = goal;
    this.queue = [];
  }

  process() {
    this.queue.forEach(scene => scene.process());
  }

  addScene(scene: Scene) {
    this.queue.push(scene);
    return this;
  }

  restart() {
    return this;
  }
}
