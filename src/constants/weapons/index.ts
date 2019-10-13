import AXES from "./axes";

const WEAPONS = {
  ...AXES
};

export const COMBAT_CATEGORIES = {
  PHYSICAL: "PHYSICAL",
  MAGIC: "MAGIC",
  SPECIAL: "SPECIAL"
} as const;

export default WEAPONS;
