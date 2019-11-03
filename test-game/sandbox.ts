import range from "lodash/range";
import last from "lodash/last";
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
  birthMonth: "March",
  bloodType: "B",
  sex: "F",
  items: [Items.Weapons.SilverAxe],
  weaponLevels: [{ specialty: "Axes", level: "A" }],
  supports: {},
  base: Lord
}).process();

const Artemis = new UnitCreationService({
  level: 17,
  name: "Artemis",
  birthMonth: "August",
  bloodType: "O",
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
  { coordinates: { x: 0, y: 0 }, unit: Calypso, allegiance: "PLAYER" },
  {
    coordinates: { x: 6, y: 5 },
    unit: Artemis,
    allegiance: "ENEMY",
    behavior: "ACTIVE"
  }
]);

const logs: string[] = ["Enemy AI test begin"];

const renderMap = () => {
  console.clear();
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
  console.log(logs.join("\n"));
};

// setTimeout(() => {
// const player = battleManager.playerUnits[0];
const enemy = battleManager.enemyUnits[0];
const enemyBehavior = battleManager.getUnitBehaviorFromCoordinates(
  enemy.pathfinder.currentCoordinates
);

mapManager.addEventListener("moveUnit", ({ unit, path }) => {
  const coords = JSON.stringify(last(path).coordinates);
  logs.push(`${unit.unitManager.unit.name} moves to ${coords}`);
  renderMap();
});

mapManager.addEventListener("conflict", results => {
  results.forEach(
    ({
      config: { aggressor, defender },
      didMove,
      didHit,
      didCritical,
      damage
    }) => {
      const unitName = aggressor.unitManager.unit.name;
      if (didMove) {
        logs.push(`${unitName} attacks.`);

        if (didHit) {
          const message = `${unitName} deals ${damage} damage${
            didCritical ? " with a critical hit!!" : ""
          }!`;
          logs.push(message);

          const defenderHealth = defender.unitManager.calculatedStats.health;
          const defenderName = defender.unitManager.unit.name;
          logs.push(`${defenderName} has ${defenderHealth} health remaining.`);
          if (defenderHealth < 1) {
            console.log(`${defenderName} has died.`);
          }
        } else {
          logs.push("The attack missed!");
        }
      } else {
        logs.push(`${unitName} takes no action.`);
      }
    }
  );
  renderMap();
});

renderMap();

setTimeout(() => {
  enemyBehavior.process();
}, 2000);

setTimeout(() => {
  enemyBehavior.process();
}, 4000);

setTimeout(() => {
  enemyBehavior.process();
}, 6000);
