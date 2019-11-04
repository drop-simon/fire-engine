import sample from "lodash/sample";
import { BirthMonthType, BloodType, StatGrowthRateListType } from "../../types";

export const BLOOD_TYPE_MODIFIERS = {
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
};

export const BIRTH_MONTH_MODIFIERS = {
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
};

const BASE_GROWTH_RATE = 0.6;
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
  const growthRates: StatGrowthRateListType = {
    health: 0.8,
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

  benefitStats.forEach((stat: keyof typeof growthRates) => {
    growthRates[stat] = Math.min(
      growthRates[stat] + getBeneficialGrowthModifier(),
      0.9
    );
  });
  detrimentStats.forEach((stat: keyof typeof growthRates) => {
    growthRates[stat] = Math.max(
      growthRates[stat] + getDetrimentalGrowthModifier(),
      0.3
    );
  });

  return growthRates;
};

const BASE_STAT_RANGES = [
  [0, 1], // super detriment
  [1, 2], // detriment
  [2, 3], // neutral
  [3, 4], // benefit
  [4, 5] // super benefit
];
const BASE_HEALTH_RANGES = [
  [8, 9], // super detriment
  [10, 11], // detriment
  [12, 13, 14], // neutral
  [15, 16], // benefit
  [17, 18] // super benefit
];

export const createStartingStats = ({
  birthMonth,
  bloodType
}: {
  birthMonth: BirthMonthType;
  bloodType: BloodType;
}) => {
  const statList: StatGrowthRateListType = {
    health: 0,
    power: 0,
    skill: 0,
    speed: 0,
    luck: 0,
    defense: 0,
    resistance: 0
  };

  const benefits = [
    BLOOD_TYPE_MODIFIERS[bloodType].BENEFIT,
    BIRTH_MONTH_MODIFIERS[birthMonth].BENEFIT
  ];
  const detriments = [
    BLOOD_TYPE_MODIFIERS[bloodType].DETRIMENT,
    BIRTH_MONTH_MODIFIERS[birthMonth].DETRIMENT
  ];

  for (const key in statList) {
    let i = 2;
    benefits.forEach(list => {
      if (list.includes(key)) {
        i = Math.max(0, i - 1);
      }
    });
    detriments.forEach(list => {
      if (list.includes(key)) {
        i = Math.min(4, i + 1);
      }
    });

    if (key === "health") {
      statList[key] = sample(BASE_HEALTH_RANGES[i]);
    } else {
      statList[key as keyof typeof statList] = sample(BASE_STAT_RANGES[i]);
    }
  }

  return statList;
};
