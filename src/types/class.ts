import { Classes } from "../constants";

type AllUnitClasses = typeof Classes;

export type UnitClassName = AllUnitClasses[keyof AllUnitClasses]["name"];
