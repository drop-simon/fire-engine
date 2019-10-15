import { UnitType } from "../types";

const DialogueActions = {
  AddUnits: (units: UnitType[]) =>
    ({ type: "ADD_UNITS", payload: { units } } as const),
  DismissUnits: (unitNames: string[]) =>
    ({
      type: "DISMISS_UNITS",
      payload: { unitNames }
    } as const),
  OpenDialogue: (unitName: string, dialogue: string) =>
    ({
      type: "OPEN_DIALOGUE",
      payload: { unitName, dialogue }
    } as const)
};

type DialogueActionConfig = ReturnType<
  (typeof DialogueActions)[keyof typeof DialogueActions]
>;

export type DialogueQueue = ReturnType<DialogueCreationService["process"]>;

export default class DialogueCreationService {
  dialogueQueue: DialogueActionConfig[] = [];
  units: UnitType[] = [];

  process() {
    return this.dialogueQueue;
  }

  addUnits(units: UnitType[]) {
    this.units.push(...units);

    const action = DialogueActions.AddUnits(units);
    this.dialogueQueue.push(action);

    return this;
  }

  dismissUnits(unitNames: string[]) {
    this.units = this.units.filter(unit => !unitNames.includes(unit.name));

    const action = DialogueActions.DismissUnits(unitNames);
    this.dialogueQueue.push(action);

    return this;
  }

  addDialogue({ unitName, dialogue }: { unitName: string; dialogue: string }) {
    const unit = this.units.find(({ name }) => name === unitName);
    if (unit) {
      const action = DialogueActions.OpenDialogue(unitName, dialogue);
      this.dialogueQueue.push(action);
    }
    return this;
  }
}
