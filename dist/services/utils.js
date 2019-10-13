// probability is a float between 0 and 1
export const getProbabilityResult = (probability) => Math.round(Math.random() * 100) / 100 < probability;
export const increaseStats = ({ currentStats, growthRates }) => {
    const nextStats = { ...currentStats };
    for (const key in growthRates) {
        const stat = key;
        const shouldIncrement = getProbabilityResult(growthRates[stat]);
        if (shouldIncrement) {
            nextStats[stat] = nextStats[stat] + 1;
        }
    }
    return nextStats;
};
//# sourceMappingURL=utils.js.map