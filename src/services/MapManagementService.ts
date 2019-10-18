import UnitPathfindingService, {
  UnitCoordinates,
  Coordinates,
  TerrainWithKey
} from "./BattleManagementService/UnitPathfindingService";
import { TerrainCreator, Unit, UnitBehavior, UnitAllegiance } from "../types";
import GameManagementService from "./GameManagementService";
import { getMapSize } from "./utils";

export type MapConfigType = {
  terrain: TerrainCreator[][];
};

export interface MapManagementServiceConstructor {
  map: MapConfigType;
  enemyUnits?: UnitCoordinates[];
  playerUnits?: UnitCoordinates[];
  neutralUnits?: UnitCoordinates[];
  gameManager: GameManagementService;
}

export default class MapManagementService {
  map: MapConfigType & ReturnType<typeof getMapSize>;
  gameManager: GameManagementService;
  pathfinders: { [key: string]: UnitPathfindingService };

  enemyUnits: UnitCoordinates[] = [];
  playerUnits: UnitCoordinates[] = [];
  neutralUnits: UnitCoordinates[] = [];

  chests: { coordinates: Coordinates; isOpened?: false }[] = [];

  constructor({
    map,
    enemyUnits = [],
    playerUnits = [],
    neutralUnits = [],
    gameManager
  }: MapManagementServiceConstructor) {
    this.enemyUnits = enemyUnits;
    this.playerUnits = playerUnits;
    this.neutralUnits = neutralUnits;
    this.map = { ...map, ...getMapSize(map) };
    this.gameManager = gameManager;
    this.pathfinders = this.units.reduce(
      (acc, unitCoordinates) => {
        const pathfinder = new UnitPathfindingService({
          mapManager: this,
          unitCoordinates,
          gameManager: this.gameManager
        });
        acc[unitCoordinates.unit.name] = pathfinder;
        return acc;
      },
      {} as { [key: string]: UnitPathfindingService }
    );
  }

  get units() {
    return [...this.playerUnits, ...this.neutralUnits, ...this.enemyUnits];
  }

  addUnit(unitCoordinates: UnitCoordinates) {
    switch (unitCoordinates.allegiance) {
      case "ENEMY": {
        this.enemyUnits.push(unitCoordinates);
        break;
      }
      case "PLAYER": {
        this.playerUnits.push(unitCoordinates);
        break;
      }
      case "NEUTRAL": {
        this.neutralUnits.push(unitCoordinates);
        break;
      }
      default:
        return this;
    }
    const pathfinder = new UnitPathfindingService({
      gameManager: this.gameManager,
      mapManager: this,
      unitCoordinates
    });
    this.pathfinders[unitCoordinates.unit.name] = pathfinder;
    return this;
  }

  addUnits(
    units: (UnitCoordinates & {
      allegiance: UnitAllegiance;
    })[]
  ) {
    units.forEach(this.addUnit);
    return this;
  }

  getTile({ x, y }: Coordinates, unit?: Unit): TerrainWithKey {
    const row = this.map.terrain[y];
    if (!row) {
      return null;
    }
    const terrainCreator = row[x];
    if (!terrainCreator) {
      return null;
    }
    return {
      ...terrainCreator(unit),
      key: this.createTileKey({ x, y }),
      coordinates: { x, y }
    };
  }

  createTileKey = ({ x, y }: Coordinates) => `x:${x},y:${y}`;
}
