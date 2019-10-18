import { AnyUnitClassName, Unit } from "../../types/unit";

export const createCanUsePromotionalItem = (
  unit: Unit,
  unitClasses: AnyUnitClassName[]
) => unit.level >= 10 && unitClasses.includes(unit.base.name);
