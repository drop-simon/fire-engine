import { Unit } from "../types";

const DialogueActions = {
  AddUnits: (units: Unit[]) =>
    ({ type: "ADD_UNITS", payload: { units } } as const),
  DismissUnits: (units: Unit[]) =>
    ({
      type: "DISMISS_UNITS",
      payload: { units }
    } as const),
  OpenDialogue: (unit: Unit, dialogue: string) =>
    ({
      type: "OPEN_DIALOGUE",
      payload: { unit, dialogue }
    } as const)
};

type DialogueActionConfig = ReturnType<
  (typeof DialogueActions)[keyof typeof DialogueActions]
>;

export type DialogueQueue = ReturnType<DialogueCreationService["process"]>;

export default class DialogueCreationService {
  dialogueQueue: DialogueActionConfig[] = [];
  units: Unit[] = [];

  process() {
    return this.dialogueQueue;
  }

  addUnits(units: Unit[]) {
    this.units.push(...units);
    const action = DialogueActions.AddUnits(units);
    this.dialogueQueue.push(action);
    return this;
  }

  dismissUnits(units: Unit[]) {
    const unitNames = units.map(unit => unit.name);
    this.units = this.units.filter(unit => !unitNames.includes(unit.name));

    const action = DialogueActions.DismissUnits(units);
    this.dialogueQueue.push(action);

    return this;
  }

  openDialogue({ unit, dialogue }: { unit: Unit; dialogue: string }) {
    const action = DialogueActions.OpenDialogue(unit, dialogue);
    this.dialogueQueue.push(action);
    return this;
  }
}
