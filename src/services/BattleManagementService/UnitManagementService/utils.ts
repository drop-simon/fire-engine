import ConflictProcessingService from "../../ConflictProcessingService";
import { MapManagedUnit, MapTileInformation } from "../../MapManagementService";
import UnitManagementService from "./UnitManagementService";

export const compareConflictStats = ({
  aggressor,
  defender
}: {
  aggressor: MapManagedUnit;
  defender: MapManagedUnit;
}) => {
  const service = new ConflictProcessingService({ aggressor, defender });
  const aggressorStats = service.createParticipantConfig("aggressor");

  const { health: defenderHealth } = defender.unitManager.calculatedStats;

  const damageHeuristic = Math.max(0, defenderHealth - aggressorStats.damage);
  const accuracyHeuristic = 100 - aggressorStats.accuracy;
  const criticalHeuristic = 100 - aggressorStats.critical;

  const maxRate = 200 + defenderHealth;

  return maxRate - damageHeuristic - accuracyHeuristic - criticalHeuristic;
};

export const areUnitsAllied = (
  unitA: UnitManagementService,
  unitB: UnitManagementService
) => {
  if (unitA.allegiance === "ENEMY") {
    return unitB.allegiance === "ENEMY";
  }
  return unitB.allegiance !== "ENEMY";
};

export const getTerrainSafety = ({
  calculated: {
    effects: {
      static: { avoid, defense }
    }
  }
}: MapTileInformation["terrain"]) => {
  return avoid + defense;
};
