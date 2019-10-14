import axes from "./axes";

export const Weapons = {
  ...axes
};

export const CombatCategories = {
  Physical: "Physical",
  Magic: "Magic",
  Special: "Special"
} as const;
