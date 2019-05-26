"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = require("phaser");
const GridScene_1 = __importDefault(require("./GridScene"));
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    parent: "main",
    scene: [GridScene_1.default],
};
class MinesweeperGame extends phaser_1.Game {
    constructor(config) {
        super(config);
    }
}
exports.MinesweeperGame = MinesweeperGame;
window.onload = () => {
    const msGame = new MinesweeperGame(config);
    msGame.scene.start("GridScene");
};
