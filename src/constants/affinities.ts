import { AffinityType } from "../types";

export const Anima: AffinityType = {
  name: "Anima",
  supportBonus: {
    power: 0.5,
    defense: 0.5,
    avoid: 2.5,
    criticalEvade: 2.5
  }
};

export const Dark: AffinityType = {
  name: "Dark",
  supportBonus: {
    avoid: 2.5,
    accuracy: 2.5,
    criticalEvade: 2.5,
    critical: 2.5
  }
};

export const Fire: AffinityType = {
  name: "Fire",
  supportBonus: {
    power: 0.5,
    accuracy: 2.5,
    avoid: 2.5,
    critical: 2.5
  }
};

export const Ice: AffinityType = {
  name: "Ice",
  supportBonus: {
    defense: 0.5,
    accuracy: 2.5,
    avoid: 2.5,
    criticalEvade: 2.5
  }
};

export const Light: AffinityType = {
  name: "Light",
  supportBonus: {
    power: 0.5,
    defense: 0.5,
    accuracy: 2.5,
    critical: 2.5
  }
};

export const Thunder: AffinityType = {
  name: "Thunder",
  supportBonus: {
    defense: 0.5,
    avoid: 2.5,
    critical: 2.5,
    criticalEvade: 2.5
  }
};

export const Wind: AffinityType = {
  name: "Wind",
  supportBonus: {
    power: 0.5,
    accuracy: 2.5,
    critical: 2.5,
    criticalEvade: 2.5
  }
};

export const Months = {
  January: {
    bloodTypeAffinities: {
      A: Ice,
      B: Wind,
      O: Fire,
      AB: Ice
    }
  },
  February: {
    bloodTypeAffinities: {
      A: Wind,
      B: Fire,
      O: Thunder,
      AB: Anima
    }
  },
  March: {
    bloodTypeAffinities: {
      A: Ice,
      B: Wind,
      O: Anima,
      AB: Thunder
    }
  },
  April: {
    bloodTypeAffinities: {
      A: Anima,
      B: Fire,
      O: Thunder,
      AB: Ice
    }
  },
  May: {
    bloodTypeAffinities: {
      A: Light,
      B: Thunder,
      O: Fire,
      AB: Wind
    }
  },
  June: {
    bloodTypeAffinities: {
      A: Thunder,
      B: Anima,
      O: Wind,
      AB: Fire
    }
  },
  July: {
    bloodTypeAffinities: {
      A: Anima,
      B: Wind,
      O: Ice,
      AB: Thunder
    }
  },
  August: {
    bloodTypeAffinities: {
      A: Wind,
      B: Dark,
      O: Fire,
      AB: Anima
    }
  },
  September: {
    bloodTypeAffinities: {
      A: Fire,
      B: Ice,
      O: Anima,
      AB: Thunder
    }
  },
  October: {
    bloodTypeAffinities: {
      A: Ice,
      B: Anima,
      O: Wind,
      AB: Fire
    }
  },
  November: {
    bloodTypeAffinities: {
      A: Anima,
      B: Thunder,
      O: Ice,
      AB: Dark
    }
  },
  December: {
    bloodTypeAffinities: {
      A: Thunder,
      B: Fire,
      O: Wind,
      AB: Light
    }
  }
} as const;
