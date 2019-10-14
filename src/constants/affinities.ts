import { StatName } from "../types";

export type AffinityBonusType = {
  power?: number;
  defense?: number;
  resistance?: number;
  critical?: number;
  criticalEvade?: number;
  avoid?: number;
  accuracy?: number;
};

export type AffectableStat = Exclude<StatName, "constitution" | "movement">;

export type AffinityType = {
  name: string;
  supportBonus: AffinityBonusType;
};

const Anima: AffinityType = {
  name: "Anima",
  supportBonus: {
    power: 0.5,
    defense: 0.5,
    avoid: 2.5,
    criticalEvade: 2.5
  }
};

const Dark: AffinityType = {
  name: "Dark",
  supportBonus: {
    avoid: 2.5,
    accuracy: 2.5,
    criticalEvade: 2.5,
    critical: 2.5
  }
};

const Fire: AffinityType = {
  name: "Fire",
  supportBonus: {
    power: 0.5,
    accuracy: 2.5,
    avoid: 2.5,
    critical: 2.5
  }
};

const Ice: AffinityType = {
  name: "Ice",
  supportBonus: {
    defense: 0.5,
    accuracy: 2.5,
    avoid: 2.5,
    criticalEvade: 2.5
  }
};

const Light: AffinityType = {
  name: "Light",
  supportBonus: {
    power: 0.5,
    defense: 0.5,
    accuracy: 2.5,
    critical: 2.5
  }
};

const Thunder: AffinityType = {
  name: "Thunder",
  supportBonus: {
    defense: 0.5,
    avoid: 2.5,
    critical: 2.5,
    criticalEvade: 2.5
  }
};

const Wind: AffinityType = {
  name: "Wind",
  supportBonus: {
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
} as const;

export const Months = {
  January: {
    bloodTypeAffinities: {
      A: Affinities.Ice,
      B: Affinities.Wind,
      O: Affinities.Fire,
      AB: Affinities.Ice
    }
  },
  February: {
    bloodTypeAffinities: {
      A: Affinities.Wind,
      B: Affinities.Fire,
      O: Affinities.Thunder,
      AB: Affinities.Anima
    }
  },
  March: {
    bloodTypeAffinities: {
      A: Affinities.Ice,
      B: Affinities.Wind,
      O: Affinities.Anima,
      AB: Affinities.Thunder
    }
  },
  April: {
    bloodTypeAffinities: {
      A: Affinities.Anima,
      B: Affinities.Fire,
      O: Affinities.Thunder,
      AB: Affinities.Ice
    }
  },
  May: {
    bloodTypeAffinities: {
      A: Affinities.Light,
      B: Affinities.Thunder,
      O: Affinities.Fire,
      AB: Affinities.Wind
    }
  },
  June: {
    bloodTypeAffinities: {
      A: Affinities.Thunder,
      B: Affinities.Anima,
      O: Affinities.Wind,
      AB: Affinities.Fire
    }
  },
  July: {
    bloodTypeAffinities: {
      A: Affinities.Anima,
      B: Affinities.Wind,
      O: Affinities.Ice,
      AB: Affinities.Thunder
    }
  },
  August: {
    bloodTypeAffinities: {
      A: Affinities.Wind,
      B: Affinities.Dark,
      O: Affinities.Fire,
      AB: Affinities.Anima
    }
  },
  September: {
    bloodTypeAffinities: {
      A: Affinities.Fire,
      B: Affinities.Ice,
      O: Affinities.Anima,
      AB: Affinities.Thunder
    }
  },
  October: {
    bloodTypeAffinities: {
      A: Affinities.Ice,
      B: Affinities.Anima,
      O: Affinities.Wind,
      AB: Affinities.Fire
    }
  },
  November: {
    bloodTypeAffinities: {
      A: Affinities.Anima,
      B: Affinities.Thunder,
      O: Affinities.Ice,
      AB: Affinities.Dark
    }
  },
  December: {
    bloodTypeAffinities: {
      A: Affinities.Thunder,
      B: Affinities.Fire,
      O: Affinities.Wind,
      AB: Affinities.Light
    }
  }
} as const;
