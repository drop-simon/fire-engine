import Constants from "./constants";
import GameManagementService from "./services/GameManagementService";
import ChapterCreationService from "./services/ChapterCreationService";
import DialogueCreationService from "./services/DialogueCreationService";
import BattleManagementService from "./services/BattleManagementService";
import MapManagementService from "./services/MapManagementService";
import UnitPathfindingService from "./services/UnitPathfindingService";
import UnitCreationService from "./services/UnitCreationService";
import ConflictProcessingService from "./services/ConflictProcessingService";

const FireEngine = {
  Constants,
  GameManagementService,
  ChapterCreationService,
  DialogueCreationService,
  BattleManagementService,
  MapManagementService,
  UnitPathfindingService,
  UnitCreationService,
  ConflictProcessingService
};

export default FireEngine;
