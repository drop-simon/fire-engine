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
  units = new Map<string, Unit>();
  chapters = new Map<string, Chapter>();

  constructor() {
    super();
  }

  registerUnit(unit: Unit) {
    if (this.units.get(unit.name)) {
      console.warn("Attempted to register a unit with the same name twice");
    } else {
      this.units.set(unit.name, unit);
    }
    return this;
  }

  registerChapter(chapter: Chapter) {
    if (this.chapters.get(chapter.name)) {
      console.warn("Attempted to register a chapter with the same name twice");
    } else {
      this.chapters.set(chapter.name, chapter);
    }
    return this;
  }

  startGame() {}
}
