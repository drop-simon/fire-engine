import { getProbabilityResult } from "./utils";
export default class BattleManagementService {
    constructor({ defender, aggressor }) {
        this.defender = defender;
        this.aggressor = aggressor;
    }
    process() {
        const results = [];
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
    processTurn(target) {
        const { participant, accuracy, critical, damage } = this.createParticipantConfig(target);
        const didMove = !!participant.equippedWeapon;
        const didHit = getProbabilityResult(accuracy);
        const didCritical = getProbabilityResult(critical);
        const result = {
            participant: target,
            didMove,
            didHit,
            didCritical,
            damage: didCritical ? damage * 3 : damage
        };
        return result;
    }
    createParticipantConfig(target) {
        const { aggressor } = this.getParticipants(target);
        return {
            damage: this.getDamage(target),
            accuracy: this.getAccuracy(target),
            critical: this.getCritical(target),
            participant: aggressor
        };
    }
    getDamage(target) {
        const { aggressor, defender } = this.getParticipants(target);
        const isMagicAttack = aggressor.unit.base.category === "MAGIC";
        const damage = isMagicAttack
            ? aggressor.conflict.attackPower - defender.unit.stats.resistance
            : aggressor.conflict.attackPower - defender.unit.stats.defense;
        return damage;
    }
    getAccuracy(target) {
        const { aggressor, defender } = this.getParticipants(target);
        const accuracy = aggressor.conflict.accuracy - defender.conflict.avoid;
        return accuracy;
    }
    getCritical(target) {
        const { aggressor, defender } = this.getParticipants(target);
        const critical = aggressor.conflict.critical - defender.conflict.criticalAvoid;
        return critical;
    }
    getNumberOfTurns(target) {
        const { aggressor, defender } = this.getParticipants(target);
        const attackSpeedDifference = aggressor.conflict.attackSpeed - defender.conflict.attackSpeed;
        const numberOfTurns = attackSpeedDifference >= 4 ? 2 : 1;
        return numberOfTurns;
    }
    getParticipants(target) {
        const aggressor = this[target];
        const defender = this[target === "aggressor" ? "defender" : "aggressor"];
        return { aggressor, defender };
    }
}
//# sourceMappingURL=BattleManagementService.js.map