import sample from "lodash/sample";
const BLOOD_TYPE_MODIFIERS = {
    A: {
        BENEFIT: ["power", "skill", "health", "luck"],
        DETRIMENT: ["speed", "defense", "resistance"]
    },
    B: {
        BENEFIT: ["defense", "defense", "luck", "speed"],
        DETRIMENT: ["power", "health", "resistance"]
    },
    O: {
        BENEFIT: ["health", "speed", "resistance", "power"],
        DETRIMENT: ["skill", "defense", "luck"]
    },
    AB: {
        BENEFIT: ["speed", "defense", "resistance", "skill"],
        DETRIMENT: ["health", "luck", "power"]
    }
};
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
};
const BASE_GROWTH_RATE = 0.5;
const BENEFICIAL_GROWTH_RATE_MODIFIERS = [0.1, 0.15, 0.2];
const DETRIMENTAL_GROWTH_RATE_MODIFIERS = [-0.1, -0.15, -0.2];
const getBeneficialGrowthModifier = () => sample(BENEFICIAL_GROWTH_RATE_MODIFIERS);
const getDetrimentalGrowthModifier = () => sample(DETRIMENTAL_GROWTH_RATE_MODIFIERS);
export const createGrowthRates = ({ birthMonth, bloodType }) => {
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
    const benefitStats = [sample(bloodTypeMods.BENEFIT)].concat(birthMonthMods.BENEFIT);
    const detrimentStats = [sample(bloodTypeMods.DETRIMENT)].concat(birthMonthMods.DETRIMENT);
    benefitStats.forEach(stat => {
        growthRates[stat] = Math.min(growthRates[stat] + getBeneficialGrowthModifier(), 0.85);
    });
    detrimentStats.forEach(stat => {
        growthRates[stat] = Math.max(growthRates[stat] + getDetrimentalGrowthModifier(), 0.15);
    });
    return growthRates;
};
//# sourceMappingURL=utils.js.map