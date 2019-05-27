"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const phaser_1 = require("phaser");
const lib_1 = require("@minesweeper/core/lib");
const isArrayEqual = (arr1, arr2) => {
    return arr1.every((e, i) => {
        return e === arr2[i];
    });
};
class CellObj extends phaser_1.GameObjects.Sprite {
    constructor(scene, pos, params) {
        super(scene, pos.x, pos.y, enums_1.Textures.COVERED);
        this.isHover = false;
        this.setInteractive();
        this.on(enums_1.EmitterEvents.CLICKED, this.clickEventHandler);
        this.on(enums_1.EmitterEvents.DOUBLE_CLICKED, this.doubleClickEventHandler);
        this.on(enums_1.EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on(enums_1.EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);
        // TODO - change to this.cell = Grid.getCell(index)
        this.cellIndex = params.index;
    }
    refreshState() {
        const cellData = lib_1.Grid.getCell(this.cellIndex);
        if (this.isAdajcentToHovered()) {
            this.setTexture(enums_1.Textures.ADJACENT);
        }
        else if (this.isHover && !cellData.isFlagged) {
            this.setTexture(enums_1.Textures.HOVER);
        }
        else if (!cellData.isCovered) {
            this.setTexture(cellData.isMined ? enums_1.Textures.MINED : enums_1.UncoveredTexturesMap.lookup(cellData.adjacentMines));
        }
        else if (cellData.isFlagged) {
            this.setTexture(enums_1.Textures.FLAGGED);
        }
        else {
            this.setTexture(enums_1.Textures.COVERED);
        }
    }
    clickEventHandler(pointer) {
        this.isHover = false;
        switch (pointer.buttons) {
            case 1:
                lib_1.Grid.getCell(this.cellIndex).uncover();
                break;
            case 2:
                lib_1.Grid.getCell(this.cellIndex).toggleFlag();
                break;
            default:
                break;
        }
        console.log(lib_1.Grid.getCell(this.cellIndex));
    }
    doubleClickEventHandler(pointer) {
        pointer.buttons === 1 ? console.log("L double click detected") : console.log("other double click detected");
    }
    hoverInEventHandler() {
        const cellData = lib_1.Grid.getCell(this.cellIndex);
        if (!cellData.isCovered) {
            const highlightAdjCells = cellData.getAdjacentCoveredCells().map(cell => cell.coordinate);
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
        }
        else {
            this.isHover = true;
            CellObj.ADJACENCY_COORDS = [];
        }
    }
    hoverOutEventHandler() {
        if (lib_1.Grid.getCell(this.cellIndex).isCovered) {
            this.isHover = false;
        }
    }
    isAdajcentToHovered() {
        return CellObj.ADJACENCY_COORDS.some(e => { return isArrayEqual(e, this.cellIndex); });
    }
}
CellObj.ADJACENCY_COORDS = [];
exports.default = CellObj;
