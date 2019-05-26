"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = require("phaser");
const enums_1 = require("./enums");
class Cell2D extends phaser_1.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
    }
    onCLick(cellObj) {
        // console.log(cellObj);
        console.log(cellObj.getData("coord"));
        cellObj.clear();
        cellObj.fillStyle(enums_1.Color.UNCOVERED);
        cellObj.lineStyle(1, 0xecd078);
    }
}
exports.Cell2D = Cell2D;
