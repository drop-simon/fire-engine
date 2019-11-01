import { TerrainConfig } from "../types/terrain";
import { Unit } from "../types";

const createVoidLikeTile = (name: string): TerrainConfig => ({
  name,
  movementCost: Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: () => ({})
});

export const Void = createVoidLikeTile("void");
export const Wall = createVoidLikeTile("wall");
export const BuildingSpace = createVoidLikeTile("building space");

const createGapLikeTile = (name: string): TerrainConfig => ({
  name,
  movementCost: Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { flying } }: Unit) =>
    flying ? { movementCost: 1 } : {}
});
export const Gap = createGapLikeTile("gap");
export const Thicket = createGapLikeTile("thicket");
export const Cliff = createGapLikeTile("cliff");
export const Fence = createGapLikeTile("fence");
export const Snag = createGapLikeTile("snag");

const createFloorLikeTile = (name: string): TerrainConfig => ({
  name,
  movementCost: 1,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: () => ({})
});
export const Floor = createFloorLikeTile("floor");
export const Plain = createFloorLikeTile("plains");
export const Chest = createFloorLikeTile("chest");
export const Bridge = createFloorLikeTile("bridge");

const createVillageLikeTile = (name: string): TerrainConfig => ({
  name,
  movementCost: 1,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: () => ({})
});
export const Village = createVillageLikeTile("village");
export const Armory = createVillageLikeTile("armory");
export const Vendor = createVillageLikeTile("vendor");
export const Arena = createVillageLikeTile("arena");
export const Stairs = createVillageLikeTile("stairs");

export const Ballista: TerrainConfig = {
  name: "ballista",
  movementCost: 2,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { flying } }: Unit) =>
    flying ? { movementCost: 1 } : {}
};

export const Forest: TerrainConfig = {
  name: "forest",
  movementCost: 2,
  effects: {
    static: {
      defense: 1,
      avoid: 20
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { flying, horseback } }: Unit) =>
    flying ? { movementCost: 1 } : horseback ? { movementCost: 3 } : {}
};

export const Pillar: TerrainConfig = {
  name: "pillar",
  movementCost: 2,
  effects: {
    static: {
      defense: 1,
      avoid: 20
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { flying, horseback, armored } }: Unit) =>
    flying
      ? { movementCost: 1 }
      : horseback || armored
      ? { movementCost: 3 }
      : {}
};

export const MOUNTAIN_TRAVERSABLE_UNITS: string[] = [
  "Fighter",
  "Warrior",
  "Berserker",
  "Pirate"
];
export const Mountain: TerrainConfig = {
  name: "mountain",
  movementCost: Infinity,
  effects: {
    static: {
      defense: 2,
      avoid: 30
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ name, base: { flying } }: Unit) =>
    MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
      ? { movementCost: 4 }
      : flying
      ? { movementCost: 1 }
      : {}
};

export const Peak: TerrainConfig = {
  name: "peak",
  movementCost: Infinity,
  effects: {
    static: {
      defense: 2,
      avoid: 40
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ name, base: { flying } }: Unit) =>
    MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
      ? { movementCost: 4 }
      : flying
      ? { movementCost: 1 }
      : {}
};

export const Gate: TerrainConfig = {
  name: "gate",
  movementCost: 1,
  effects: {
    static: {
      defense: 2,
      avoid: 20
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ stats: { health } }: Unit) => ({
    effects: { ongoing: { health: Math.round(health / 10) } }
  })
};

export const Throne: TerrainConfig = {
  name: "throne",
  movementCost: 1,
  effects: {
    static: {
      defense: 3,
      avoid: 30
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: Gate.getUnitModifications
};

export const WATER_TRAVERSABLE_UNITS: string[] = ["Berserker", "Pirate"];
export const Sea: TerrainConfig = {
  name: "sea",
  movementCost: Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ name, base: { flying } }: Unit) =>
    WATER_TRAVERSABLE_UNITS.includes(name)
      ? { movementCost: 2 }
      : flying
      ? { movementCost: 1 }
      : {}
};

export const Lake: TerrainConfig = {
  name: "lake",
  movementCost: Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ name, base: { flying } }: Unit) =>
    WATER_TRAVERSABLE_UNITS.includes(name)
      ? { movementCost: 3 }
      : flying
      ? { movementCost: 1 }
      : {}
};

export const Fort: TerrainConfig = {
  name: "fort",
  movementCost: 2,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { flying } }: Unit) =>
    flying ? { movementCost: 1 } : {}
};

export const Desert: TerrainConfig = {
  name: "desert",
  movementCost: 2,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { category, horseback } }) =>
    category === "Magic"
      ? { movementCost: 2 }
      : horseback
      ? { movementCost: 4 }
      : {}
};

export const River: TerrainConfig = {
  name: "river",
  movementCost: Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: unit =>
    unit.base.name === "Pirate"
      ? { movementCost: 2 }
      : !unit.base.horseback || unit.base.promotions.length === 0
      ? { movementCost: 5 }
      : {}
};

export const Ruins: TerrainConfig = {
  name: "ruins",
  movementCost: 2,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: ({ base: { flying } }: Unit) =>
    flying ? { movementCost: 1 } : {}
};

export const Sand: TerrainConfig = {
  name: "sand",
  movementCost: 1,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  },
  getUnitModifications: () => ({})
};
