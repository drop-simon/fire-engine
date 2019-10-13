const Anima = {
    name: "Anima",
    bonus: {
        power: 0.5,
        defense: 0.5,
        avoid: 2.5,
        criticalEvade: 2.5
    }
};
const Dark = {
    name: "Dark",
    bonus: {
        avoid: 2.5,
        accuracy: 2.5,
        criticalEvade: 2.5,
        critical: 2.5
    }
};
const Fire = {
    name: "Fire",
    bonus: {
        power: 0.5,
        accuracy: 2.5,
        avoid: 2.5,
        critical: 2.5
    }
};
const Ice = {
    name: "Ice",
    bonus: {
        defense: 0.5,
        accuracy: 2.5,
        avoid: 2.5,
        criticalEvade: 2.5
    }
};
const Light = {
    name: "Light",
    bonus: {
        power: 0.5,
        defense: 0.5,
        accuracy: 2.5,
        critical: 2.5
    }
};
const Thunder = {
    name: "Thunder",
    bonus: {
        defense: 0.5,
        avoid: 2.5,
        critical: 2.5,
        criticalEvade: 2.5
    }
};
const Wind = {
    name: "Wind",
    bonus: {
        power: 0.5,
        accuracy: 2.5,
        critical: 2.5,
        criticalEvade: 2.5
    }
};
export const Affinities = {
    Anima,
    Dark,
    Fire,
    Ice,
    Light,
    Thunder,
    Wind
};
export const Months = {
    January: {
        BloodTypeAffinities: {
            A: Affinities.Ice,
            B: Affinities.Wind,
            O: Affinities.Fire,
            AB: Affinities.Ice
        }
    },
    February: {
        BloodTypeAffinities: {
            A: Affinities.Wind,
            B: Affinities.Fire,
            O: Affinities.Thunder,
            AB: Affinities.Anima
        }
    },
    March: {
        BloodTypeAffinities: {
            A: Affinities.Ice,
            B: Affinities.Wind,
            O: Affinities.Anima,
            AB: Affinities.Thunder
        }
    },
    April: {
        BloodTypeAffinities: {
            A: Affinities.Anima,
            B: Affinities.Fire,
            O: Affinities.Thunder,
            AB: Affinities.Ice
        }
    },
    May: {
        BloodTypeAffinities: {
            A: Affinities.Light,
            B: Affinities.Thunder,
            O: Affinities.Fire,
            AB: Affinities.Wind
        }
    },
    June: {
        BloodTypeAffinities: {
            A: Affinities.Thunder,
            B: Affinities.Anima,
            O: Affinities.Wind,
            AB: Affinities.Fire
        }
    },
    July: {
        BloodTypeAffinities: {
            A: Affinities.Anima,
            B: Affinities.Wind,
            O: Affinities.Ice,
            AB: Affinities.Thunder
        }
    },
    August: {
        BloodTypeAffinities: {
            A: Affinities.Wind,
            B: Affinities.Dark,
            O: Affinities.Fire,
            AB: Affinities.Anima
        }
    },
    September: {
        BloodTypeAffinities: {
            A: Affinities.Fire,
            B: Affinities.Ice,
            O: Affinities.Anima,
            AB: Affinities.Thunder
        }
    },
    October: {
        BloodTypeAffinities: {
            A: Affinities.Ice,
            B: Affinities.Anima,
            O: Affinities.Wind,
            AB: Affinities.Fire
        }
    },
    November: {
        BloodTypeAffinities: {
            A: Affinities.Anima,
            B: Affinities.Thunder,
            O: Affinities.Ice,
            AB: Affinities.Dark
        }
    },
    December: {
        BloodTypeAffinities: {
            A: Affinities.Thunder,
            B: Affinities.Fire,
            O: Affinities.Wind,
            AB: Affinities.Light
        }
    }
};
export { default as Terrain } from "./terrain";
//# sourceMappingURL=index.js.map