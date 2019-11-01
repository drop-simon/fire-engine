import * as AllTerrain from "./terrain";
import * as AllAffinityConstants from "./affinities";
import * as AllClasses from "./classes";
import * as AllItems from "./items";

export const { Months, ...Affinities } = AllAffinityConstants;
export const Terrain = AllTerrain;
export const Classes = AllClasses;
export const Items = AllItems;

const Constants = {
  Terrain,
  Affinities,
  Months,
  Classes,
  Items
};

export default Constants;
