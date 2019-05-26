"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const phaser_1 = require("phaser");
const lib_1 = require("@minesweeper/core/lib");
const matchArray = (arr1, arr2) => {
    return arr1.every((e, i) => {
        return e === arr2[i];
    });
};
class CellObj extends phaser_1.GameObjects.Sprite {
    constructor(scene, pos, params) {
        super(scene, pos.x, pos.y, enums_1.Textures.COVERED);
        this.setInteractive();
        this.on(enums_1.EmitterEvents.CLICKED, this.clickEventHandler);
        this.on(enums_1.EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on(enums_1.EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);
        // this.setDataEnabled();
        // this.data.events.on( InputEventType.CHANGE_DATA, this.refreshState);
        this.cellIndex = params.index;
        console.log(this.cellIndex);
    }
    clickEventHandler(pointer) {
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
    }
    refreshState() {
        console.log(`[${this.cellIndex}] refreshing state`);
        const cellData = lib_1.Grid.getCell(this.cellIndex);
        if (this.isAdajcentToHovered()) {
            this.setTexture(enums_1.Textures.ADJACENT);
        }
        else {
            switch (cellData.state) {
                case 1 /* UNCOVERED */:
                    this.setTexture(cellData.isMined ? enums_1.Textures.MINED : enums_1.Textures.EMPTY);
                    break;
                case 0 /* COVERED */:
                    this.setTexture(cellData.flagged ? enums_1.Textures.FLAGGED : enums_1.Textures.COVERED);
                    break;
                default:
                    break;
            }
        }
    }
    hoverInEventHandler() {
        const cellData = lib_1.Grid.getCell(this.cellIndex);
        if (cellData.isCovered) {
            this.setTexture(enums_1.Textures.HOVER);
            const highlightAdjCells = cellData.getAdjacentCoveredCells().map(cell => cell.coordinate);
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
            console.log(highlightAdjCells);
        }
    }
    hoverOutEventHandler() {
        if (lib_1.Grid.getCell(this.cellIndex).isCovered) {
            this.setTexture(enums_1.Textures.COVERED);
        }
    }
    isAdajcentToHovered() {
        console.log(`"ADJACENCY_COORDS": ${CellObj.ADJACENCY_COORDS}`);
        return CellObj.ADJACENCY_COORDS.some(e => { return matchArray(e, this.cellIndex); });
    }
}
CellObj.ADJACENCY_COORDS = [];
exports.default = CellObj;
