import DialogueCreationService, {
  DialogueQueue
} from "./DialogueCreationService";
import BattleManagementService from "./BattleManagementService";

export type ChapterGoalType = {
  description: string;
  endCondition: (map: any) => boolean;
  failCondition: (map: any) => boolean;
};

interface ChapterCreationServiceConstructor {
  goal: ChapterGoalType;
}

export type ChapterType = {
  goal: ChapterGoalType;
};

export type ChapterQueueItem = {
  type: "DIALOGUE";
  item: DialogueQueue;
};

export type ChapterQueue = ReturnType<ChapterCreationService["process"]>;

export default class ChapterCreationService {
  goal: ChapterGoalType;
  queue: ChapterQueueItem[];

  constructor({ goal }: ChapterCreationServiceConstructor) {
    this.goal = goal;
    this.queue = [];
  }

  process() {
    return this.queue;
  }

  addToChapter(queueItem: ChapterQueueItem) {
    this.queue.push(queueItem);
    return this;
  }
}
