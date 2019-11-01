import * as AllWeapons from "./weapons";
import * as AllConsumables from "./consumables";
import * as AllPromotional from "./promotional";

export const Weapons = AllWeapons;
export const Consumables = AllConsumables;
export const Promotional = AllPromotional;

const Items = {
  Weapons,
  Consumables,
  Promotional
};

export default Items;
