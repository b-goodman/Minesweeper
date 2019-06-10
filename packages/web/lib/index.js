"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = require("phaser");
const GridScene_1 = __importDefault(require("./scenes/GridScene"));
const gameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: "main",
    scene: [GridScene_1.default],
    scale: {
        mode: phaser_1.Scale.FIT,
        autoCenter: phaser_1.Scale.CENTER_BOTH,
    },
    audio: {
        disableWebAudio: true
    },
};
class MinesweeperGame extends phaser_1.Game {
    constructor(config) {
        super(config);
    }
}
;
const gridSceneParams = {
    rows: 10,
    cellWidth: 60,
};
window.onload = () => {
    const msGame = new MinesweeperGame(gameConfig);
    msGame.scene.start("GridScene", gridSceneParams);
};
//# sourceMappingURL=index.js.map