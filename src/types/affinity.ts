import { Affinities } from "../constants";

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
