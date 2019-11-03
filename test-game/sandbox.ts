import range from "lodash/range";
import FireEngine from "../src";
import GameManagementService from "../src/services/GameManagementService";
import MapManagementService from "../src/services/MapManagementService";
import BattleManagementService from "../src/services/BattleManagementService";
const {
  Constants: {
    Items,
    Terrain: { Floor, Forest, Gap, Thicket },
    Classes: {
      Physical: { Lord }
    }
  },
  UnitCreationService
} = FireEngine;

const Calypso = new UnitCreationService({
  level: 15,
  name: "Calypso",
  birthMonth: "September",
  bloodType: "A",
  sex: "F",
  items: [Items.Weapons.SilverAxe],
  weaponLevels: [{ specialty: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();

const Artemis = new UnitCreationService({
  level: 17,
  name: "Artemis",
  birthMonth: "June",
  bloodType: "AB",
  sex: "M",
  items: [Items.Weapons.SilverAxe],
  weaponLevels: [{ specialty: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();

const FLOOR_TILE = "░░";
const PLAYER_TILE = "☺↑";
const ENEMY_TILE = "☻↑";

const mapRange = range(15);
const row = mapRange.map(() => Floor);
// const terrain = mapRange.map(() => row);
const terrain = [
  [Floor, Floor, Thicket, Floor, Floor, Forest, Thicket, Floor, Floor, Floor],
  [Floor, Forest, Floor, Floor, Floor, Floor, Forest, Forest, Thicket, Floor],
  [Floor, Forest, Floor, Floor, Floor, Thicket, Floor, Floor, Floor, Floor],
  [Floor, Floor, Forest, Floor, Floor, Forest, Floor, Floor, Floor, Floor],
  [Thicket, Floor, Floor, Thicket, Floor, Floor, Floor, Floor, Floor, Thicket],
  [
    Floor,
    Floor,
    Thicket,
    Floor,
    Thicket,
    Thicket,
    Floor,
    Floor,
    Floor,
    Thicket
  ],
  [Floor, Floor, Floor, Floor, Floor, Floor, Forest, Forest, Floor, Floor],
  [Floor, Floor, Floor, Thicket, Thicket, Floor, Forest, Floor, Floor, Thicket]
];

const gameManager = new GameManagementService();
const mapManager = new MapManagementService({
  gameManager,
  terrain
});

const battleManager = new BattleManagementService({
  gameManager,
  mapManager,
  goal: {
    description: "Just testing",
    endCondition: () => false,
    failCondition: () => false
  }
});

mapManager.addUnits([
  { coordinates: { x: 0, y: 0 }, unit: Artemis, allegiance: "PLAYER" },
  {
    coordinates: { x: 6, y: 5 },
    unit: Artemis,
    allegiance: "ENEMY",
    behavior: "ACTIVE"
  }
]);

const renderMap = () => {
  // console.clear();
  console.log(
    battleManager.map.terrain
      .map((row, y) =>
        row
          .map(({ name }, x) => {
            const unit = battleManager.units.find(
              ({ pathfinder: { currentCoordinates } }) =>
                currentCoordinates.x === x && currentCoordinates.y === y
            );
            if (unit) {
              return unit.unitManager.allegiance === "PLAYER"
                ? PLAYER_TILE
                : ENEMY_TILE;
            }

            if (name === "thicket") {
              return "ΨΨ";
            }

            return FLOOR_TILE;
          })
          .join(" ")
      )
      .join("\n")
  );
};

// setTimeout(() => {
// const player = battleManager.playerUnits[0];
const enemy = battleManager.enemyUnits[0];
const enemyBehavior = battleManager.getUnitBehaviorFromCoordinates(
  enemy.pathfinder.currentCoordinates
);

renderMap();

mapManager.addEventListener("moveUnit", ({ unit, path }) => {
  path.forEach((step, i) => {
    setTimeout(() => {
      unit.pathfinder.currentCoordinates = step.coordinates;
      // renderMap();
    }, (i + 1) * 300);
  });
});

mapManager.addEventListener("conflict", results =>
  results.forEach(
    ({ config: { participant }, didMove, didHit, didCritical, damage }) => {
      const unitName = participant.unitManager.unit.name;
      if (didMove) {
        console.log(`${unitName} attacks.`);

        if (didHit) {
          const message = `${unitName} deals ${damage}${
            didCritical ? " with a critical hit!!" : ""
          }!`;
          console.log(message);
        } else {
          console.log("The attack missed!");
        }
      } else {
        console.log(`${unitName} doesn't move.`);
      }
    }
  )
);

enemyBehavior.process();
enemyBehavior.process();
enemyBehavior.process();
// }, 1000);

renderMap();
