import { ConfiguredMapType } from "./MapManagementService";
import { ChapterGoalType } from "./ChapterManagementService";

interface BattleManagementServiceConstructor {
  mapConfig: ConfiguredMapType;
  goal: ChapterGoalType;
}

export default class BattleManagementService {
  mapConfig: ConfiguredMapType;
  goal: ChapterGoalType;
  numTurns = 0;

  constructor({ mapConfig, goal }: BattleManagementServiceConstructor) {
    this.mapConfig = mapConfig;
    this.goal = goal;
  }

  process() {}
}
