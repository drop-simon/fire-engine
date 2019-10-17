import { Classes } from "../constants";
import { CombatCategory } from "./item";
import { ValueInObject } from "./util";

export type AllUnitClasses = typeof Classes;

export type MagicUnitClasses = AllUnitClasses["Magic"];
export type PhysicalUnitClasses = AllUnitClasses["Physical"];
export type SpecialUnitClasses = AllUnitClasses["Special"];

export type MagicUnitClassName = ValueInObject<MagicUnitClasses>["name"];
export type PhysicalUnitClassName = ValueInObject<PhysicalUnitClasses>["name"];
export type SpecialUnitClassName = ValueInObject<SpecialUnitClasses>["name"];

export type UnitClassName<C extends CombatCategory> = C extends "Magic"
  ? MagicUnitClassName
  : C extends "Physical"
  ? PhysicalUnitClassName
  : SpecialUnitClassName;

export type AnyUnitClassName =
  | MagicUnitClassName
  | PhysicalUnitClassName
  | SpecialUnitClassName;
