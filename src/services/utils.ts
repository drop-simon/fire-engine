import { StatListType, StatGrowthRateListType, TerrainConfig } from "../types";
import { MapTerrain, MapTileInformation } from "./MapManagementService";
import { Coordinates } from "./UnitPathfindingService";

// probability is a float between 0 and 1
export const getProbabilityResult = (probability: number) =>
  Number(Math.random().toPrecision(2)) < probability;

export const increaseStats = ({
  currentStats,
  growthRates
}: {
  currentStats: StatListType;
  growthRates: StatGrowthRateListType;
}) => {
  const nextStats = { ...currentStats };
  for (const key in growthRates) {
    const stat = key as keyof typeof growthRates;
    const shouldIncrement = getProbabilityResult(growthRates[stat]);
    if (shouldIncrement) {
      nextStats[stat] = nextStats[stat] + 1;
    }
  }
  return nextStats;
};

export const getMapDimensions = function(terrain: MapTerrain) {
  const width = terrain[0].length - 1;
  const height = terrain.length - 1;

  return { width, height };
};

export const getManhattanDistance = (
  coordsA: Coordinates,
  coordsB: Coordinates
) => {
  const xDistance = Math.abs(coordsA.x - coordsB.x);
  const yDistance = Math.abs(coordsA.y - coordsB.y);
  return xDistance + yDistance;
};

export const getTargetableTiles = ({
  tiles,
  origin,
  weaponRange
}: {
  tiles: MapTileInformation[];
  origin: MapTileInformation;
  weaponRange: [number, number];
}) => {
  const [min, max] = weaponRange;
  return tiles.filter(tile => {
    const distance = getManhattanDistance(origin.coordinates, tile.coordinates);
    return distance <= max && distance >= min;
  });
};
