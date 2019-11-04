import {
  UnitConfig,
  StatGrowthRateListType,
  StatListType,
  CombatCategory
} from "../../types";
import { Months } from "../../constants";
import { createGrowthRates, createStartingStats } from "./utils";
import { increaseStats } from "../utils";

export default class UnitCreationService<C extends CombatCategory> {
  config: UnitConfig<C>;
  constructor(config: UnitConfig<C>) {
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

  private calculateAffinity() {
    const { birthMonth, bloodType } = this.config;
    return Months[birthMonth as keyof typeof Months].bloodTypeAffinities[
      bloodType
    ];
  }

  private createGrowthRates() {
    const { birthMonth, bloodType } = this.config;
    return createGrowthRates({ birthMonth, bloodType });
  }

  private createStats = ({
    growthRates,
    level
  }: {
    growthRates: StatGrowthRateListType;
    level: number;
  }) => {
    const { birthMonth, bloodType } = this.config;
    let stats: StatListType = {
      ...createStartingStats({ bloodType, birthMonth }),
      movement: this.config.base.baseMovement,
      constitution: 5
    };
    for (let i = 0; i < level + 4; i++) {
      stats = increaseStats({ currentStats: stats, growthRates });
    }
    return stats;
  };
}
