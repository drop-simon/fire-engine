import {
  UnitType,
  AnyUnitClassConfigType,
  StatGrowthRateListType
} from "../types";
import EventEmitterService from "./EventEmitterService";
import UnitManagementService from "./UnitManagementService";
import { DialogueQueue } from "./DialogueCreationService";
import { ChapterQueue } from "./ChapterCreationService";
import { ConflictQueue } from "./ConflictProcessingService";

type GameEventHandlers = {
  unitLevelUp: (args: {
    unit: UnitType;
    prevStats: StatGrowthRateListType;
    nextStats: StatGrowthRateListType;
  }) => any;
  // dialogue: (queue: DialogueQueue) => any;
  // conflict: (queue: ConflictQueue) => any;
  chapter: (queue: ChapterQueue) => any;
};

export default class GameManagementService extends EventEmitterService<
  GameEventHandlers
> {
  unitClasses = new Map<string, AnyUnitClassConfigType>();
  units = new Map<string, UnitType>();
  chapters: { name: string; queue: ChapterQueue }[] = [];

  startGame() {}

  registerUnit(unit: UnitType) {
    this.units.set(unit.name, unit);
    return this;
  }

  addChapter(chapterName: string, chapterQueue: ChapterQueue) {
    this.chapters.push({ name: chapterName, queue: chapterQueue });
    return this;
  }

  startChapter(chapterName: string) {
    const chapter = this.chapters.find(({ name }) => name === chapterName);
    if (chapter) {
      this.emit("chapter", chapter.queue);
    }
    return this;
  }

  getUnit(unitName: string) {
    const unit = this.units.get(unitName);
    if (!unit) {
      return null;
    }
    return new UnitManagementService({ unit, gameManager: this });
  }
}
