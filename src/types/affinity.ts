import { Affinities, Months } from "../constants";

export type BirthMonthType = keyof typeof Months;

export type BloodType = "A" | "B" | "O" | "AB";

export type AffinityName = keyof typeof Affinities;

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
