import { TerrainCreatorType } from "../types/terrain";

const createVoidLikeTileCreator = (name: string): TerrainCreatorType => () => ({
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
  }
});
const VOID_LIKE_TERRAIN_CREATORS = {
  Void: createVoidLikeTileCreator("void"),
  Wall: createVoidLikeTileCreator("wall"),
  BuildingSpace: createVoidLikeTileCreator("building space")
} as const;

const createGapLikeTileCreator = (name: string): TerrainCreatorType => ({
  base: { flying }
}) => ({
  name,
  movementCost: flying ? 1 : Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  }
});
const GAP_LIKE_TERRAIN_CREATORS = {
  Gap: createGapLikeTileCreator("gap"),
  Thicket: createGapLikeTileCreator("thicket"),
  Cliff: createGapLikeTileCreator("cliff"),
  Fence: createGapLikeTileCreator("fence"),
  Snag: createGapLikeTileCreator("snag")
};

const createFloorLikeTileCreator = (
  name: string
): TerrainCreatorType => () => ({
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
  }
});
const FLOOR_LIKE_TERRAIN_CREATORS = {
  Floor: createFloorLikeTileCreator("floor"),
  Plain: createFloorLikeTileCreator("plains"),
  Chest: createFloorLikeTileCreator("chest"),
  Bridge: createFloorLikeTileCreator("bridge")
} as const;

const createVillageLikeTileCreator = (
  name: string
): TerrainCreatorType => () => ({
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
  }
});
const VILLAGE_LIKE_TERRAIN_CREATORS = {
  Village: createVillageLikeTileCreator("village"),
  Armory: createVillageLikeTileCreator("armory"),
  Vendor: createVillageLikeTileCreator("vendor"),
  Arena: createVillageLikeTileCreator("arena"),
  Stairs: createVillageLikeTileCreator("stairs")
} as const;

const Ballista: TerrainCreatorType = ({ base: { flying } }) => ({
  name: "ballista",
  movementCost: flying ? 1 : 2,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  }
});

const Forest: TerrainCreatorType = ({ base: { horseback, flying } }) => ({
  name: "forest",
  flyable: true,
  movementCost: flying ? 1 : horseback ? 3 : 2,
  effects: {
    static: {
      defense: 1,
      avoid: 20
    },
    ongoing: {
      health: 0
    }
  }
});

const Pillar: TerrainCreatorType = ({
  base: { horseback, flying, armored }
}) => ({
  name: "pillar",
  flyable: true,
  movementCost: flying ? 1 : horseback || armored ? 3 : 2,
  effects: {
    static: {
      defense: 1,
      avoid: 20
    },
    ongoing: {
      health: 0
    }
  }
});

const MOUNTAIN_TRAVERSABLE_UNITS: string[] = [
  "Fighter",
  "Warrior",
  "Berserker",
  "Pirate"
];
const Mountain: TerrainCreatorType = ({ base: { flying } }) => ({
  name: "mountain",
  flyable: true,
  movementCost: !MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
    ? Infinity
    : flying
    ? 1
    : 4,
  effects: {
    static: {
      defense: 2,
      avoid: 30
    },
    ongoing: {
      health: 0
    }
  }
});

const Peak: TerrainCreatorType = ({ base: { flying } }) => ({
  name: "peak",
  movementCost: !MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
    ? Infinity
    : flying
    ? 1
    : 4,
  effects: {
    static: {
      defense: 2,
      avoid: 40
    },
    ongoing: {
      health: 0
    }
  }
});

const Gate: TerrainCreatorType = ({ stats }) => ({
  name: "gate",
  movementCost: 1,
  effects: {
    static: {
      defense: 2,
      avoid: 20
    },
    ongoing: {
      health: Math.round(stats.health / 10)
    }
  }
});

const Throne: TerrainCreatorType = ({ stats }) => ({
  name: "throne",
  movementCost: 1,
  effects: {
    static: {
      defense: 3,
      avoid: 30
    },
    ongoing: {
      health: Math.round(stats.health / 10)
    }
  }
});

const WATER_TRAVERSABLE_UNITS: string[] = ["Berserker", "Pirate"];
const Sea: TerrainCreatorType = ({ base: { name, flying } }) => ({
  name: "sea",
  movementCost: !WATER_TRAVERSABLE_UNITS.includes(name)
    ? Infinity
    : flying
    ? 1
    : 2,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  }
});

const Lake: TerrainCreatorType = ({ base: { name, flying } }) => ({
  name: "lake",
  movementCost: !WATER_TRAVERSABLE_UNITS.includes(name)
    ? Infinity
    : flying
    ? 1
    : 3,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  }
});

const Fort: TerrainCreatorType = ({ base: { name, flying } }) => ({
  name: "fort",
  movementCost: flying ? 1 : 2,
  effects: {
    static: {
      defense: 0,
      avoid: 10
    },
    ongoing: {
      health: 0
    }
  }
});

const Desert: TerrainCreatorType = ({ base: { horseback, category } }) => ({
  name: "desert",
  movementCost: horseback ? 4 : category === "Magic" ? 1 : 2,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  }
});

const River: TerrainCreatorType = ({
  base: { promotions, name, horseback }
}) => ({
  name: "river",
  movementCost:
    name === "Pirate"
      ? 2
      : !horseback || promotions.length === 0
      ? 5
      : Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 5
    },
    ongoing: {
      health: 0
    }
  }
});

const Cliff: TerrainCreatorType = ({ base: { flying } }) => ({
  name: "cliff",
  movementCost: flying ? 1 : Infinity,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  }
});

const Ruins: TerrainCreatorType = ({ base: { flying } }) => ({
  name: "ruins",
  movementCost: flying ? 1 : 2,
  effects: {
    static: {
      defense: 0,
      avoid: 0
    },
    ongoing: {
      health: 0
    }
  }
});

const Sand: TerrainCreatorType = () => ({
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
  }
});

export const Terrain = {
  ...VOID_LIKE_TERRAIN_CREATORS,
  ...GAP_LIKE_TERRAIN_CREATORS,
  ...FLOOR_LIKE_TERRAIN_CREATORS,
  ...VILLAGE_LIKE_TERRAIN_CREATORS,
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
