import { WeaponType, Unit, UnitAllegiance, UnitBehavior } from "../../../types";
import { increaseStats } from "../../utils";
import GameManagementService from "../../GameManagementService";
import MapManagementService from "../../MapManagementService";
import { Coordinates } from "../../UnitPathfindingService";

export type UnitCoordinates = {
  unit: Unit;
  coordinates: Coordinates;
  allegiance: UnitAllegiance;
  behavior?: UnitBehavior;
};

interface UnitManagementServiceConfig {
  unitCoordinates: UnitCoordinates;
  gameManager: GameManagementService;
  mapManager: MapManagementService;
}

export default class UnitManagementService {
  unit: Unit;
  allegiance: UnitAllegiance;
  gameManager: GameManagementService;
  mapManager: MapManagementService;
  behavior: UnitBehavior = "PASSIVE";

  constructor({
    unitCoordinates: { unit, allegiance, behavior },
    gameManager,
    mapManager
  }: UnitManagementServiceConfig) {
    this.unit = unit;
    this.allegiance = allegiance;
    this.gameManager = gameManager;
    this.mapManager = mapManager;
    if (behavior) {
      this.behavior = behavior;
    }
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

  get calculatedStats() {
    return this.unit.stats;
  }

  get items() {
    return this.unit.items;
  }

  get healingItems() {
    return this.items.filter(
      ({ effect }) => effect && effect.static && effect.static.health
    );
  }

  get weapons() {
    return this.unit.items.filter(
      ({ category }) => category === "Weapon"
    ) as WeaponType[];
  }

  get equippableWeapons() {
    return this.weapons.filter(this.getCanEquipWeapon);
  }

  get equippedWeapon() {
    return this.weapons.find(this.getCanEquipWeapon);
  }

  get equippedSpecialty() {
    if (!this.equippedWeapon) {
      return null;
    }
    return this.equippedWeapon.specialty;
  }

  get equippableAttackWeapons() {
    return this.equippableWeapons.filter(({ friendly }) => !friendly);
  }

  get equippableSupportWeapons() {
    return this.equippableWeapons.filter(({ friendly }) => friendly);
  }

  get supportRanges() {
    return this.equippableSupportWeapons.map(w => w.range);
  }

  get attackRanges() {
    return this.equippableAttackWeapons.map(w => w.range);
  }

  get damageTaken() {
    return this.unit.stats.health - this.calculatedStats.health;
  }

  get conflictStats() {
    return {
      attackPower: this.attackPower,
      attackSpeed: this.attackSpeed,
      accuracy: this.accuracy,
      avoid: this.avoid,
      critical: this.critical,
      criticalAvoid: this.criticalAvoid,
      staffAccuracy: this.staffAccuracy
    };
  }

  getCanEquipWeapon = (weapon: WeaponType) =>
    this.unit.weaponLevels.some(
      ({ specialty, level }) =>
        specialty == weapon.specialty && level <= weapon.level
    );

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
