import sample from "lodash/sample";
import { BirthMonthType, BloodType, StatGrowthRateListType } from "../../types";

const BLOOD_TYPE_MODIFIERS = {
  A: {
    BENEFIT: ["speed", "power", "health", "luck"],
    DETRIMENT: ["skill", "defense", "resistance"]
  },
  B: {
    BENEFIT: ["power", "health", "speed", "resistance"],
    DETRIMENT: ["defense", "skill", "luck"]
  },
  O: {
    BENEFIT: ["health", "defense", "skill", "luck"],
    DETRIMENT: ["resistance", "speed", "power"]
  },
  AB: {
    BENEFIT: ["power", "defense", "resistance", "skill"],
    DETRIMENT: ["health", "luck", "speed"]
  }
} as const;

const BIRTH_MONTH_MODIFIERS = {
  January: {
    BENEFIT: ["luck", "skill"],
    DETRIMENT: ["health", "defense"]
  },
  February: {
    BENEFIT: ["skill", "defense"],
    DETRIMENT: ["power", "speed"]
  },
  March: {
    BENEFIT: ["defense", "power"],
    DETRIMENT: ["luck", "resistance"]
  },
  April: {
    BENEFIT: ["speed", "skill"],
    DETRIMENT: ["resistance", "defense"]
  },
  May: {
    BENEFIT: ["power", "luck"],
    DETRIMENT: ["defense", "skill"]
  },
  June: {
    BENEFIT: ["speed", "resistance"],
    DETRIMENT: ["power", "defense"]
  },
  July: {
    BENEFIT: ["resistance", "health"],
    DETRIMENT: ["skill", "luck"]
  },
  August: {
    BENEFIT: ["power", "health"],
    DETRIMENT: ["luck", "defense"]
  },
  September: {
    BENEFIT: ["speed", "defense"],
    DETRIMENT: ["luck", "health"]
  },
  October: {
    BENEFIT: ["health", "skill"],
    DETRIMENT: ["defense", "power"]
  },
  November: {
    BENEFIT: ["luck", "speed"],
    DETRIMENT: ["health", "power"]
  },
  December: {
    BENEFIT: ["resistance", "defense"],
    DETRIMENT: ["speed", "health"]
  }
} as const;

const BASE_GROWTH_RATE = 0.5;
const GROWTH_RATE_MODIFIERS = [0.05, 0.1, 0.15, 0.2];

const getBeneficialGrowthModifier = () => sample(GROWTH_RATE_MODIFIERS);

const getDetrimentalGrowthModifier = () => sample(GROWTH_RATE_MODIFIERS) * -1;

export const createGrowthRates = ({
  birthMonth,
  bloodType
}: {
  birthMonth: BirthMonthType;
  bloodType: BloodType;
}) => {
  const growthRates = {
    health: BASE_GROWTH_RATE,
    power: BASE_GROWTH_RATE,
    skill: BASE_GROWTH_RATE,
    speed: BASE_GROWTH_RATE,
    luck: BASE_GROWTH_RATE,
    defense: BASE_GROWTH_RATE,
    resistance: BASE_GROWTH_RATE
  };

  const bloodTypeMods = BLOOD_TYPE_MODIFIERS[bloodType];
  const birthMonthMods = BIRTH_MONTH_MODIFIERS[birthMonth];

  const benefitStats = [sample(bloodTypeMods.BENEFIT)].concat(
    birthMonthMods.BENEFIT
  );
  const detrimentStats = [sample(bloodTypeMods.DETRIMENT)].concat(
    birthMonthMods.DETRIMENT
  );

  benefitStats.forEach(stat => {
    growthRates[stat] = Math.min(
      growthRates[stat] + getBeneficialGrowthModifier(),
      0.85
    );
  });
  detrimentStats.forEach(stat => {
    growthRates[stat] = Math.max(
      growthRates[stat] + getDetrimentalGrowthModifier(),
      0.15
    );
  });

  return growthRates as StatGrowthRateListType;
};
