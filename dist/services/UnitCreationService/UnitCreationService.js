import { Months } from "../../constants";
import { createGrowthRates } from "./utils";
import { increaseStats } from "../utils";
export default class UnitCreationService {
    constructor(config) {
        this.createStats = ({ growthRates, level }) => {
            let stats = {
                health: 5,
                power: 0,
                skill: 0,
                speed: 0,
                luck: 0,
                defense: 0,
                resistance: 0,
                constitution: 5,
                movement: this.config.base.baseMovement
            };
            for (let i = 0; i < level + 4; i++) {
                stats = increaseStats({ currentStats: stats, growthRates });
            }
            return stats;
        };
        this.config = config;
    }
    process() {
        const unit = this.config;
        const affinity = this.calculateAffinity();
        const growthRates = this.createGrowthRates();
        const stats = this.createStats({ growthRates, level: unit.level });
        return {
            ...unit,
            affinity,
            growthRates,
            stats
        };
    }
    calculateAffinity() {
        const { birthMonth, bloodType } = this.config;
        return Months[birthMonth].BloodTypeAffinities[bloodType];
    }
    createGrowthRates() {
        const { birthMonth, bloodType } = this.config;
        return createGrowthRates({ birthMonth, bloodType });
    }
}
//# sourceMappingURL=UnitCreationService.js.map