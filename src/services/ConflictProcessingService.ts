import { ManagedUnit } from "../types";
import { getProbabilityResult, getManhattanDistance } from "./utils";
import UnitManagementService from "./BattleManagementService/UnitManagementService";
import { MapManagedUnit } from "./MapManagementService";

interface ConflictProcessingServiceConstructor {
  defender: MapManagedUnit;
  aggressor: MapManagedUnit;
}

type Target = "aggressor" | "defender";

type ConflictParticipantConfig = ReturnType<
  ConflictProcessingService["createParticipantConfig"]
>;

type ProcessTurnResult = {
  config: ConflictParticipantConfig;
  didMove: boolean;
  didHit: boolean;
  didCritical: boolean;
  damage: number;
};

export type ConflictQueue = ReturnType<ConflictProcessingService["process"]>;

export default class ConflictProcessingService {
  defender: MapManagedUnit;
  aggressor: MapManagedUnit;

  constructor({ defender, aggressor }: ConflictProcessingServiceConstructor) {
    this.defender = defender;
    this.aggressor = aggressor;
  }

  process() {
    const results: ProcessTurnResult[] = [];

    let aggressorTurns = this.getNumberOfTurns("aggressor");
    let defenderTurns = this.getNumberOfTurns("defender");

    do {
      if (aggressorTurns > 0) {
        results.push(this.processTurn("aggressor"));
        aggressorTurns -= 1;
      }
      if (defenderTurns > 0) {
        results.push(this.processTurn("defender"));
        defenderTurns -= 1;
      }
    } while (aggressorTurns > 0 || defenderTurns > 0);

    return results;
  }

  private processTurn(target: Target) {
    const config = this.createParticipantConfig(target);
    const { accuracy, critical, damage } = config;

    const didCritical = getProbabilityResult(critical);
    const result: ProcessTurnResult = {
      config,
      didMove: this.getCanMove(target),
      didHit: getProbabilityResult(accuracy),
      didCritical,
      damage: didCritical ? damage * 3 : damage
    };

    return result;
  }

  createParticipantConfig(target: Target) {
    const { aggressor } = this.getParticipants(target);
    return {
      damage: this.getDamage(target),
      accuracy: this.getAccuracy(target),
      critical: this.getCritical(target),
      participant: aggressor
    };
  }

  private getCanMove(target: Target) {
    const { aggressor } = this.getParticipants(target);

    const hasEquippedWeapon = !!aggressor.unitManager.equippedWeapon;
    if (!hasEquippedWeapon) {
      return false;
    }

    // TODO: add more conditions for staves, weapon ranges, etc
    return true;
  }

  private getDamage(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);

    const isMagicAttack = aggressor.unitManager.unit.base.category === "Magic";
    const defenseStat = isMagicAttack
      ? defender.unitManager.unit.stats.resistance
      : defender.unitManager.unit.stats.defense;
    const damage =
      aggressor.unitManager.conflictStats.attackPower - defenseStat;

    return damage;
  }

  private getAccuracy(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    if (!aggressor.unitManager.equippedWeapon) {
      return 0;
    }

    if (aggressor.unitManager.equippedWeapon.specialty === "Staves") {
      const defenderStaffAvoid = this.getStaffAvoid(
        target === "aggressor" ? "defender" : "aggressor"
      );
      return (
        aggressor.unitManager.conflictStats.staffAccuracy - defenderStaffAvoid
      );
    }

    return (
      aggressor.unitManager.conflictStats.accuracy -
      defender.unitManager.conflictStats.avoid
    );
  }

  private getStaffAvoid(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);

    const manhattanDistance = getManhattanDistance(
      aggressor.pathfinder.currentCoordinates,
      defender.pathfinder.currentCoordinates
    );
    const resistanceModifier = defender.unitManager.unit.stats.resistance * 5;
    const distanceModifier = manhattanDistance * 2;

    return resistanceModifier + distanceModifier;
  }

  private getCritical(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    const critical =
      aggressor.unitManager.conflictStats.critical -
      defender.unitManager.conflictStats.criticalAvoid;
    return critical;
  }

  private getNumberOfTurns(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    const attackSpeedDifference =
      aggressor.unitManager.conflictStats.attackSpeed -
      defender.unitManager.conflictStats.attackSpeed;
    const numberOfTurns = attackSpeedDifference >= 4 ? 2 : 1;
    return numberOfTurns;
  }

  private getParticipants(target: Target) {
    const aggressor = this[target];
    const defender = this[target === "aggressor" ? "defender" : "aggressor"];
    return { aggressor, defender };
  }
}
