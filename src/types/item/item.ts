import { WeaponConfigType, CombatCategory } from "./weapon";
import { ConsumableItemConfig } from "./consumable";
import { PromotionalItemConfig } from "./promotional";
import { UnitDependantFunction, Unit, StatListType } from "../unit";
import BattleManagementService from "../../services/BattleManagementService";
import { MapManagedUnit } from "../../services/MapManagementService";

type ItemCategory = "Weapon" | "Consumable" | "Promotional" | "Other";

export interface ItemBase {
  category: ItemCategory;
  effect?: {
    static?: Partial<StatListType>;
    permanent?: Partial<StatListType>;
    ongoing?: {
      [key in keyof StatListType]?: { amount: number; numTurns: number };
    };
    curesPoison?: boolean;
  };
  name: string;
  maxUses: number;
  numUses: number;
  getCanUseInMap: (mapManagedUnit?: MapManagedUnit) => boolean;
  getCanUseInOverworld: UnitDependantFunction<boolean>;
  cost: number;
}
export type Item =
  | WeaponConfigType<CombatCategory>
  | PromotionalItemConfig<CombatCategory>
  | ConsumableItemConfig;
