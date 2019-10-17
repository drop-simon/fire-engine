import { DialogueQueue } from "./DialogueCreationService";
import BattleManagementService from "./BattleManagementService";

export type ChapterQueueItem =
  | {
      type: "DIALOGUE";
      item: DialogueQueue;
    }
  | {
      type: "BATTLE";
      item: BattleManagementService;
    };

export type Chapter = ReturnType<ChapterCreationService["process"]>;

export default class ChapterCreationService {
  queue: ChapterQueueItem[] = [];
  name: string;
  constructor(chapterName: string) {
    this.name = chapterName;
  }

  process() {
    const { name, queue } = this;
    return { name, queue };
  }

  addToChapter(queueItem: ChapterQueueItem) {
    this.queue.push(queueItem);
    return this;
  }
}
