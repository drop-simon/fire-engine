import { StatListType, StatGrowthRateListType } from "../types";
import { MapConfigType } from "./MapManagementService";

// probability is a float between 0 and 1
export const getProbabilityResult = (probability: number) =>
  Math.round(Math.random() * 100) / 100 < probability;

export const increaseStats = ({
  currentStats,
  growthRates
}: {
  currentStats: StatListType;
  growthRates: StatGrowthRateListType;
}) => {
  const nextStats = { ...currentStats };
  for (const key in growthRates) {
    const stat = key as keyof typeof growthRates;
    const shouldIncrement = getProbabilityResult(growthRates[stat]);
    if (shouldIncrement) {
      nextStats[stat] = nextStats[stat] + 1;
    }
  }
  return nextStats;
};

export const getMapSize = function(map: MapConfigType) {
  const width = map.terrain[0].length - 1;
  const height = map.terrain.length - 1;

  return { width, height };
};
