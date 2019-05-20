"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = __importStar(require("phaser"));
const GridScene_1 = __importDefault(require("./GridScene"));
const config = {
    type: Phaser.WEBGL,
    width: 600,
    height: 600,
    parent: "main",
    scene: [GridScene_1.default],
};
class MinesweeperGame extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}
exports.MinesweeperGame = MinesweeperGame;
window.onload = () => {
    const msGame = new MinesweeperGame(config);
    msGame.scene.start("GridScene");
};
