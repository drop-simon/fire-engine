const range = require("lodash/range");
const FireEngine = require("./src/index");

const {
  BattleManagementService,
  UnitCreationService,
  GameManagementService,
  MapManagementService,
  Constants
} = FireEngine;
const {
  Terrain: { Floor }
} = Constants;

const gameManager = new GameManagementService();

const gridRow = range(15).map(() => Floor);
const terrain = range(15).map(() => gridRow);
const mapManager = new MapManagementService({
  gameManager,
  terrain,
  units: []
});

const battle = new BattleManagementService({
  gameManager,
  mapManager,
  goal: {
    description: "playing around",
    endCondition: () => false,
    failCondition: () => false
  }
});

const showMap = () => console.log("░");

showMap();
