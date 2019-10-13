import UnitPathfindingService from "./UnitPathfindingService";
const SURVIVE = (n) => ({
    description: `Survive ${n} turns`,
    endCondition: (map) => map.turn === n
});
const DEFEAT_ALL = {
    description: `Defeat all enemies`,
    endCondition: (map) => map.numEnemies === 0
};
const CAPTURE_GATE = {
    description: `Seize the gate`,
    endCondition: (map) => map.numEnemies === 0
};
const CAPTURE_THRONE = {
    description: `Seize the throne`,
    endCondition: (map) => map.numEnemies === 0
};
const CHAPTER_GOALS = {
    SURVIVE,
    DEFEAT_ALL,
    CAPTURE_THRONE,
    CAPTURE_GATE
};
export default class ChapterManagementService {
    constructor({ map: { terrain, tileSet }, unitStartingPoints, enemyStartingPoints, goal }) {
        this.pauseInteractions = true;
        this.chapter = {
            map: {
                terrain: terrain.map(row => row.split("")),
                tileSet
            },
            size: {
                height: terrain.length - 1,
                width: terrain[0].length - 1
            },
            unitStartingPoints,
            enemyStartingPoints,
            goal
        };
        this.pathfinders = unitStartingPoints.reduce((acc, { unit, coordinates }) => {
            const pathfinder = new UnitPathfindingService({
                chapter: this.chapter,
                unit,
                coordinates
            });
            acc[unit.name] = pathfinder;
            return acc;
        }, {});
    }
}
//# sourceMappingURL=ChapterManagementService.js.map