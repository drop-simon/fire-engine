import { Months } from "../constants";
import { Unit } from "./unit";

export * from "./unit";
export * from "./weapons";
export * from "./item";
export * from "./terrain";

export type BirthMonth = keyof typeof Months;

export type BloodType = "A" | "B" | "O" | "AB";

export type UnitDependantFunction<T extends any> = (unit: Unit) => T;
