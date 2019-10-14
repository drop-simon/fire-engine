import { UnitType, ManagedUnitType } from "../types";
import { getProbabilityResult } from "./utils";

interface BattleConstructor {
  defender: ManagedUnitType;
  aggressor: ManagedUnitType;
}

type Target = "aggressor" | "defender";

type ProcessTurnResult = {
  participant: Target;
  didMove: boolean;
  didHit: boolean;
  didCritical: boolean;
  damage: number;
};

export default class BattleManagementService<
  U extends UnitType,
  V extends UnitType
> {
  defender: ManagedUnitType;
  aggressor: ManagedUnitType;

  constructor({ defender, aggressor }: BattleConstructor) {
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
    const {
      participant,
      accuracy,
      critical,
      damage
    } = this.createParticipantConfig(target);
    const didMove = !!participant.equippedWeapon;
    const didHit = getProbabilityResult(accuracy);
    const didCritical = getProbabilityResult(critical);

    const result: ProcessTurnResult = {
      participant: target,
      didMove,
      didHit,
      didCritical,
      damage: didCritical ? damage * 3 : damage
    };
    return result;
  }

  private createParticipantConfig(target: Target) {
    const { aggressor } = this.getParticipants(target);
    return {
      damage: this.getDamage(target),
      accuracy: this.getAccuracy(target),
      critical: this.getCritical(target),
      participant: aggressor
    };
  }

  private getDamage(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    const isMagicAttack = aggressor.unit.base.category === "Magic";
    const damage = isMagicAttack
      ? aggressor.conflictStats.attackPower - defender.unit.stats.resistance
      : aggressor.conflictStats.attackPower - defender.unit.stats.defense;

    return damage;
  }

  private getAccuracy(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    const accuracy =
      aggressor.conflictStats.accuracy - defender.conflictStats.avoid;
    return accuracy;
  }

  private getCritical(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    const critical =
      aggressor.conflictStats.critical - defender.conflictStats.criticalAvoid;
    return critical;
  }

  private getNumberOfTurns(target: Target) {
    const { aggressor, defender } = this.getParticipants(target);
    const attackSpeedDifference =
      aggressor.conflictStats.attackSpeed - defender.conflictStats.attackSpeed;
    const numberOfTurns = attackSpeedDifference >= 4 ? 2 : 1;
    return numberOfTurns;
  }

  private getParticipants(target: Target) {
    const aggressor = this[target];
    const defender = this[target === "aggressor" ? "defender" : "aggressor"];
    return { aggressor, defender };
  }
}
