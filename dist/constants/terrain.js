const Void = () => ({
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
const VOID_LIKE_TILES = {
    Void,
    Wall: Void,
    ["BuildingSpace"]: Void
};
const Gap = ({ base: { flying } }) => ({
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
const GAP_LIKE_TILES = {
    Gap,
    Thicket: Gap,
    Cliff: Gap,
    Fence: Gap,
    Snag: Gap
};
const Floor = () => ({
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
const FLOOR_LIKE_TILES = {
    Floor,
    Plain: Floor,
    Chest: Floor,
    Bridge: Floor
};
const Village = () => ({
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
const VILLAGE_LIKE_TILES = {
    Village,
    Armory: Village,
    Vendor: Village,
    Arena: Village,
    Stairs: Village
};
const Ballista = ({ base: { flying } }) => ({
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
const Forest = ({ base: { horseback, flying } }) => {
    return {
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
    };
};
const Pillar = ({ base: { horseback, flying, armored } }) => {
    return {
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
    };
};
const MOUNTAIN_TRAVERSABLE_UNITS = [
    "Fighter",
    "Warrior",
    "Berserker",
    "Pirate"
];
const Mountain = ({ base: { flying } }) => ({
    flyable: true,
    movementCost: !MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
        ? Infinity
        : flying
            ? 1
            : 4,
    effects: {
        static: {
            defense: flying ? 0 : 2,
            avoid: flying ? 0 : 30
        },
        ongoing: {
            health: 0
        }
    }
});
const Peak = ({ base: { flying } }) => ({
    movementCost: !MOUNTAIN_TRAVERSABLE_UNITS.includes(name)
        ? Infinity
        : flying
            ? 1
            : 4,
    effects: {
        static: {
            defense: flying ? 0 : 2,
            avoid: flying ? 0 : 40
        },
        ongoing: {
            health: 0
        }
    }
});
const Gate = ({ stats }) => ({
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
const Throne = ({ stats }) => ({
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
const WATER_TRAVERSABLE_UNITS = ["Berserker", "Pirate"];
const Sea = ({ base: { name, flying } }) => ({
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
const Lake = ({ base: { name, flying } }) => ({
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
const Fort = ({ base: { name, flying } }) => ({
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
const Desert = ({ base: { horseback, category } }) => ({
    movementCost: horseback ? 4 : category === "MAGIC" ? 1 : 2,
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
const River = ({ base: { promotions, name, horseback } }) => ({
    movementCost: name === "Pirate"
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
const Cliff = ({ base: { flying } }) => ({
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
const Ruins = ({ base: { flying } }) => ({
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
const Sand = () => ({
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
export default {
    ...VOID_LIKE_TILES,
    ...GAP_LIKE_TILES,
    ...FLOOR_LIKE_TILES,
    ...VILLAGE_LIKE_TILES,
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
    Void,
    Gap,
    Cliff,
    Sand
};
//# sourceMappingURL=terrain.js.map