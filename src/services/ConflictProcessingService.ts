import { getProbabilityResult, getManhattanDistance } from "./utils";
import MapManagementService, { MapManagedUnit } from "./MapManagementService";

interface ConflictProcessingServiceConstructor {
  defender: MapManagedUnit;
  aggressor: MapManagedUnit;
}

type Target = "aggressor" | "defender";

export type ConflictQueueItem = ReturnType<
  ConflictProcessingService["processTurn"]
>;

export type ConflictQueue = ReturnType<ConflictProcessingService["process"]>;

export default class ConflictProcessingService {
  defender: MapManagedUnit;
  aggressor: MapManagedUnit;
  mapManager: MapManagementService;

  constructor({ defender, aggressor }: ConflictProcessingServiceConstructor) {
    this.defender = defender;
    this.aggressor = aggressor;
    this.mapManager = aggressor.unitManager.mapManager;
  }

  process() {
    return this.createResults();
  }

  private createResults() {
    const results: ConflictQueueItem[] = [];

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

    let abort = false;
    const remainingHealth = {
      aggressor: this.aggressor.unitManager.calculatedStats.health,
      defender: this.aggressor.unitManager.calculatedStats.health
    };
    return results.reduce(
      (acc, result) => {
        if (abort) {
          return acc;
        }

        const {
          config: { target },
          damage,
          didHit,
          didMove
        } = result;

        const defenderKey = target === "defender" ? "aggressor" : "defender";

        if (didMove && didHit) {
          remainingHealth[defenderKey] = Math.max(
            remainingHealth[defenderKey] - damage,
            0
          );
        }

        if (remainingHealth[defenderKey] < 1) {
          abort = true;
        }

        return acc.concat(result);
      },
      [] as ConflictQueueItem[]
    );
  }

  private processTurn(target: Target) {
    const config = this.createParticipantConfig(target);
    const { accuracy, critical, damage } = config;

    const didCritical = getProbabilityResult(critical);
    const result = {
      config,
      didMove: this.getCanMove(target),
      didHit: getProbabilityResult(accuracy),
      didCritical,
      damage: didCritical ? damage * 3 : damage
    };

    return result;
  }

  createParticipantConfig(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    return {
      damage: this.getDamage(target),
      accuracy: this.getAccuracy(target),
      critical: this.getCritical(target),
      target,
      aggressor,
      defender
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
      ? defender.unitManager.calculatedStats.resistance
      : defender.unitManager.calculatedStats.defense;
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
    const resistanceModifier =
      defender.unitManager.calculatedStats.resistance * 5;
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
