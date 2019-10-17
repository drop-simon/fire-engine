import { WeaponType, CombatCategory, Unit } from "../../types";
import { increaseStats } from "../utils";
import GameManagementService from "../GameManagementService";

interface BattleUnitManagementServiceConfig {
  unit: Unit;
  gameManager: GameManagementService;
}

export default class BattleUnitManagementService {
  unit: Unit;
  gameManager: GameManagementService;

  constructor({ unit, gameManager }: BattleUnitManagementServiceConfig) {
    this.unit = unit;
    this.gameManager = gameManager;
  }

  levelUp() {
    if (this.unit.level === 20) {
      return this;
    }

    const currentStats = this.unit.stats;
    const nextStats = increaseStats({
      growthRates: this.unit.growthRates,
      currentStats: this.unit.stats
    });

    this.unit.stats = nextStats;
    this.gameManager.emit("unitLevelUp", {
      unit: this.unit,
      currentStats,
      nextStats
    });

    return this;
  }

  get weapons() {
    return this.unit.items.filter(
      ({ category }) => category === "Weapon"
    ) as WeaponType[];
  }

  get equippedWeapon() {
    return this.weapons.find(weapon =>
      this.unit.weaponLevels.some(
        ({ specialty, level }) =>
          specialty == weapon.specialty && level <= weapon.level
      )
    );
  }

  get conflictStats() {
    return {
      attackPower: this.attackPower,
      attackSpeed: this.attackSpeed,
      accuracy: this.accuracy,
      avoid: this.avoid,
      critical: this.critical,
      criticalAvoid: this.criticalAvoid,
      staffAccuracy: this.staffAccuracy,
      staffAvoid: this.staffAvoid
    };
  }

  private get attackPower() {
    if (this.equippedWeapon) {
      return this.unit.stats.power + this.equippedWeapon.power;
    }
    return this.unit.stats.power;
  }

  private get attackSpeed() {
    const {
      equippedWeapon,
      unit: {
        stats: { speed, constitution }
      }
    } = this;
    if (equippedWeapon && equippedWeapon.weight > constitution) {
      return speed - (equippedWeapon.weight - constitution);
    }
    return speed;
  }

  private get accuracy() {
    const { skill, luck } = this.unit.stats;
    if (!this.equippedWeapon) {
      return 0;
    }

    const accuracy = this.equippedWeapon.accuracy + skill * 2 + luck / 2;
    return accuracy;
  }

  private get staffAccuracy() {
    const { skill, power } = this.unit.stats;
    const accuracy = 30 + power * 5 + skill;
    return accuracy;
  }

  private get avoid() {
    return this.attackSpeed * 2 + this.unit.stats.luck;
    // = (Attack Speed x 2) + Luck + Support bonus + Terrain bonus + Tactician bonus
  }

  private get staffAvoid() {
    return this.unit.stats.resistance * 5;
    // = (Resistance x 5) + (Distance from enemy x 2)
  }

  private get critical() {
    const {
      unit: { stats },
      equippedWeapon
    } = this;
    if (!equippedWeapon) {
      return 0;
    }
    return equippedWeapon.critical + stats.skill / 2;
    // = Weapon Critical + (Skill / 2) + Support bonus + Critical bonus + S Rank bonus
  }

  private get criticalAvoid() {
    return this.unit.stats.luck;
    // = Luck + Support bonus + Tactician bonus
  }
}