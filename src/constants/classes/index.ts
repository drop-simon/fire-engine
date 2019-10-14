import * as MAGIC_CLASSES from "./magic";
import * as PHYSICAL_CLASSES from "./physical";
import * as SPECIAL_CLASSES from "./special";

export const Classes = {
  ...MAGIC_CLASSES,
  ...PHYSICAL_CLASSES,
  ...SPECIAL_CLASSES
} as const;
