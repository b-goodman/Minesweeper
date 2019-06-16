"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const phaser_1 = require("phaser");
const Assets_1 = require("./Assets");
const core_1 = require("@minesweeper/core");
const isArrayEqual = (arr1, arr2) => {
    return arr1.every((e, i) => {
        return e === arr2[i];
    });
};
class CellObj extends phaser_1.GameObjects.Sprite {
    // parentScene: Scene;
    constructor(scene, pos, data) {
        super(scene, pos.x, pos.y, enums_1.Textures.COVERED);
        this.isHover = false;
        this.setInteractive();
        this.on(enums_1.EmitterEvents.CLICKED, this.clickEventHandler);
        this.on(enums_1.EmitterEvents.DOUBLE_CLICKED, this.doubleClickEventHandler);
        this.on(enums_1.EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on(enums_1.EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);
        this.cellData = data.cellObj;
        this.cellData.addEventListner(core_1.CellEvents.FLAGGED, () => {
            scene.events.emit(enums_1.GameEvents.CELL_FLAGGED);
        });
        this.cellData.addEventListner(core_1.CellEvents.UNCOVERED, () => {
            scene.events.emit(enums_1.GameEvents.CELL_UNCOVERED);
        });
        this.cellData.addEventListner(core_1.CellEvents.UNFLAGGED, () => {
            scene.events.emit(enums_1.GameEvents.CELL_UNFLAGGED);
        });
        this.cellData.addEventListner(core_1.CellEvents.MINE_UNCOVERED, () => {
            scene.events.emit(enums_1.GameEvents.MINE_REVEALED);
        });
        // this.parentScene = scene;
    }
    refreshState() {
        if (this.isAdajcentToHovered()) {
            this.setTexture(enums_1.Textures.ADJACENT);
        }
        else if (this.isHover && !this.cellData.flagged) {
            this.setTexture(enums_1.Textures.HOVER);
        }
        else if (!this.cellData.covered) {
            if (this.cellData.mined) {
                this.setTexture(enums_1.Textures.MINED);
            }
            else {
                this.setTexture(Assets_1.Assets.UncoveredTextures.get(this.cellData.adjacentMines));
            }
        }
        else if (this.cellData.flagged) {
            this.setTexture(enums_1.Textures.FLAGGED);
        }
        else {
            this.setTexture(enums_1.Textures.COVERED);
        }
    }
    clickEventHandler(_pointer, whichBtn) {
        this.isHover = false;
        switch (whichBtn) {
            case enums_1.EmitterEvents.POINTER_LEFT:
                this.cellData.uncover();
                break;
            case enums_1.EmitterEvents.POINTER_RIGHT:
                this.cellData.toggleFlag();
                break;
            default:
                break;
        }
    }
    doubleClickEventHandler(_pointer, whichBtn) {
        // uncover unflagged adjacent cells, as indicated on hover
        switch (whichBtn) {
            case enums_1.EmitterEvents.POINTER_LEFT:
                CellObj.ADJACENCY_COORDS = [];
                this.cellData.getAdjacentCoveredCells().map(cell => cell.uncover());
                break;
            default:
                break;
        }
    }
    hoverInEventHandler() {
        if (!this.cellData.covered) {
            const highlightAdjCells = this.cellData.getAdjacentCoveredCells().map(cell => cell.coordinate);
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
        }
        else {
            this.isHover = true;
            CellObj.ADJACENCY_COORDS = [];
        }
    }
    hoverOutEventHandler() {
        if (this.cellData.covered) {
            this.isHover = false;
        }
    }
    isAdajcentToHovered() {
        return CellObj.ADJACENCY_COORDS.some(e => {
            return isArrayEqual(e, this.cellData.coordinate);
        });
    }
}
CellObj.ADJACENCY_COORDS = [];
exports.default = CellObj;
//# sourceMappingURL=CellObj.js.map