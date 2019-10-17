import { TerrainCreator } from "../types/terrain";
import UnitPathfindingService from "../services/BattleManagementService/UnitPathfindingService";

const createVoidLikeTileCreator = (name: string): TerrainCreator => () => ({
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

const createGapLikeTileCreator = (name: string): TerrainCreator => unit => ({
  name,
  movementCost: unit && unit.base.flying ? 1 : Infinity,
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

const createFloorLikeTileCreator = (name: string): TerrainCreator => () => ({
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

const createVillageLikeTileCreator = (name: string): TerrainCreator => () => ({
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

const Ballista: TerrainCreator = unit => ({
  name: "ballista",
  movementCost: unit && unit.base.flying ? 1 : 2,
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

const Forest: TerrainCreator = unit => ({
  name: "forest",
  movementCost: !unit ? 2 : unit.base.flying ? 1 : unit.base.horseback ? 3 : 2,
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

const Pillar: TerrainCreator = unit => ({
  name: "pillar",
  movementCost: !unit
    ? 2
    : unit.base.flying
    ? 1
    : unit.base.horseback || unit.base.armored
    ? 3
    : 2,
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
const Mountain: TerrainCreator = unit => ({
  name: "mountain",
  movementCost:
    !unit || !MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
      ? Infinity
      : unit.base.flying
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

const Peak: TerrainCreator = unit => ({
  name: "peak",
  movementCost:
    !unit || !MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
      ? Infinity
      : unit.base.flying
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

const Gate: TerrainCreator = unit => ({
  name: "gate",
  movementCost: 1,
  effects: {
    static: {
      defense: 2,
      avoid: 20
    },
    ongoing: {
      health: unit ? Math.round(unit.stats.health / 10) : 0
    }
  }
});

const Throne: TerrainCreator = unit => ({
  name: "throne",
  movementCost: 1,
  effects: {
    static: {
      defense: 3,
      avoid: 30
    },
    ongoing: {
      health: unit ? Math.round(unit.stats.health / 10) : 0
    }
  }
});

const WATER_TRAVERSABLE_UNITS: string[] = ["Berserker", "Pirate"];
const Sea: TerrainCreator = unit => ({
  name: "sea",
  movementCost:
    !unit || !WATER_TRAVERSABLE_UNITS.includes(unit.base.name)
      ? Infinity
      : unit.base.flying
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

const Lake: TerrainCreator = unit => ({
  name: "lake",
  movementCost:
    !unit || !WATER_TRAVERSABLE_UNITS.includes(unit.base.name)
      ? Infinity
      : unit.base.flying
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

const Fort: TerrainCreator = unit => ({
  name: "fort",
  movementCost: unit && unit.base.flying ? 1 : 2,
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

const Desert: TerrainCreator = unit => {
  const movementCost = unit
    ? unit.base.horseback
      ? 4
      : unit.base.category === "Magic"
      ? 1
      : 2
    : 2;

  return {
    name: "desert",
    movementCost,
    effects: {
      static: {
        defense: 0,
        avoid: 5
      },
      ongoing: {
        health: 0
      }
    }
  };
};

const River: TerrainCreator = unit => {
  const movementCost = unit
    ? unit.base.name === "Pirate"
      ? 2
      : !unit.base.horseback || unit.base.promotions.length === 0
      ? 5
      : Infinity
    : Infinity;

  return {
    name: "river",
    movementCost,
    effects: {
      static: {
        defense: 0,
        avoid: 5
      },
      ongoing: {
        health: 0
      }
    }
  };
};

const Cliff: TerrainCreator = unit => ({
  name: "cliff",
  movementCost: unit && unit.base.flying ? 1 : Infinity,
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

const Ruins: TerrainCreator = unit => ({
  name: "ruins",
  movementCost: unit && unit.base.flying ? 1 : 2,
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

const Sand: TerrainCreator = () => ({
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
