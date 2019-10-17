import { Unit, StatGrowthRateListType } from "../types";
import EventEmitterService from "./EventEmitterService";
import { Chapter } from "./ChapterCreationService";

type GameEventHandlers = {
  unitLevelUp: (args: {
    unit: Unit;
    currentStats: StatGrowthRateListType;
    nextStats: StatGrowthRateListType;
  }) => any;
  // dialogue: (queue: DialogueQueue) => any;
  // conflict: (queue: ConflictQueue) => any;
  chapter: (queue: Chapter) => any;
};

export default class GameManagementService extends EventEmitterService<
  GameEventHandlers
> {
  chapters: Chapter[] = [];
  constructor({ chapters }: { chapters: Chapter[] }) {
    super();
    this.chapters = chapters;
  }

  startGame() {}
}
