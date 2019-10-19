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
const VOID_LIKE_TERRAIN = {
  Void: createVoidLikeTile("void"),
  Wall: createVoidLikeTile("wall"),
  BuildingSpace: createVoidLikeTile("building space")
} as const;

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
const GAP_LIKE_TERRAIN = {
  Gap: createGapLikeTile("gap"),
  Thicket: createGapLikeTile("thicket"),
  Cliff: createGapLikeTile("cliff"),
  Fence: createGapLikeTile("fence"),
  Snag: createGapLikeTile("snag")
};

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
const FLOOR_LIKE_TERRAIN = {
  Floor: createFloorLikeTile("floor"),
  Plain: createFloorLikeTile("plains"),
  Chest: createFloorLikeTile("chest"),
  Bridge: createFloorLikeTile("bridge")
} as const;

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
const VILLAGE_LIKE_TERRAIN = {
  Village: createVillageLikeTile("village"),
  Armory: createVillageLikeTile("armory"),
  Vendor: createVillageLikeTile("vendor"),
  Arena: createVillageLikeTile("arena"),
  Stairs: createVillageLikeTile("stairs")
} as const;

const Ballista: TerrainConfig = {
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

const Forest: TerrainConfig = {
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

const Pillar: TerrainConfig = {
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

const MOUNTAIN_TRAVERSABLE_UNITS: string[] = [
  "Fighter",
  "Warrior",
  "Berserker",
  "Pirate"
];
const Mountain: TerrainConfig = {
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

const Peak: TerrainConfig = {
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

const Gate: TerrainConfig = {
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

const Throne: TerrainConfig = {
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

const WATER_TRAVERSABLE_UNITS: string[] = ["Berserker", "Pirate"];
const Sea: TerrainConfig = {
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

const Lake: TerrainConfig = {
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

const Fort: TerrainConfig = {
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

const Desert: TerrainConfig = {
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

const River: TerrainConfig = {
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

const Cliff: TerrainConfig = {
  name: "cliff",
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
};

const Ruins: TerrainConfig = {
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

const Sand: TerrainConfig = {
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

export const Terrain = {
  ...VOID_LIKE_TERRAIN,
  ...GAP_LIKE_TERRAIN,
  ...FLOOR_LIKE_TERRAIN,
  ...VILLAGE_LIKE_TERRAIN,
  Ballista,
  Lake,
  River,
  Fort,
  Ruins,
  Forest,
  Pillar,
  Mountain,
  Peak,
  Gate,
  Throne,
  Sea,
  Desert,
  Cliff,
  Sand
} as const;
