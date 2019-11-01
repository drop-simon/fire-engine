import { Affinities } from "../constants";

export type BirthMonthType = keyof typeof Affinities["Months"];

export type BloodType = "A" | "B" | "O" | "AB";

export type AffinityName = Exclude<keyof typeof Affinities, "Months">;

export type AffinityBonusType = {
  power?: number;
  defense?: number;
  resistance?: number;
  critical?: number;
  criticalEvade?: number;
  avoid?: number;
  accuracy?: number;
};

export type AffinityType = {
  name: string;
  supportBonus: AffinityBonusType;
};
