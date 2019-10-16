import { UnitType } from "../types";

const DialogueActions = {
  AddUnits: (units: UnitType[]) =>
    ({ type: "ADD_UNITS", payload: { units } } as const),
  DismissUnits: (units: UnitType[]) =>
    ({
      type: "DISMISS_UNITS",
      payload: { units }
    } as const),
  OpenDialogue: (unit: UnitType, dialogue: string) =>
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

  dismissUnits(units: UnitType[]) {
    const unitNames = units.map(unit => unit.name);
    this.units = this.units.filter(unit => !unitNames.includes(unit.name));

    const action = DialogueActions.DismissUnits(units);
    this.dialogueQueue.push(action);

    return this;
  }

  openDialogue({ unit, dialogue }: { unit: UnitType; dialogue: string }) {
    const action = DialogueActions.OpenDialogue(unit, dialogue);
    this.dialogueQueue.push(action);
    return this;
  }
}
