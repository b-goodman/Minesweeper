"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = __importDefault(require("./Grid"));
;
class Cell {
    constructor(args) {
        this.coordinate = args.coordinate;
        this.mined = args.isMined;
        this.neighbouringMines = args.neighbouringMines;
        this.flagged = false;
        this.covered = true;
        this.highlight = false;
        this.state = 0 /* covered */;
    }
    ;
    get isFlagged() {
        return this.flagged;
    }
    ;
    toggleFlag() {
        this.flagged = !this.flagged;
        this.state = this.flagged ? 0 /* covered */ : 1 /* uncovered */;
        return this;
    }
    ;
    toggleHighlight() {
        this.highlight = !this.highlight;
        return this.highlight;
    }
    isHighlighted() {
        return this.highlight;
    }
    get isCovered() {
        return this.covered;
    }
    ;
    get isMined() {
        return this.mined;
    }
    ;
    get adjacentMines() {
        return this.neighbouringMines;
    }
    ;
    isEmpty() {
        return !this.isFlagged && this.neighbouringMines === 0;
    }
    ;
    getAdjacentCells() {
        return Grid_1.default.getAdjacentCoords(this.coordinate).map(pos => Grid_1.default.getCell(pos));
    }
    ;
    getAdjacentUncoveredCells() {
        const allAdjCells = this.getAdjacentCells();
        // filter out coords for uncovered and flagged cells
        return allAdjCells.filter((cellObj) => {
            return !cellObj.isFlagged && cellObj.isCovered;
        });
    }
    ;
    // TODO add callback for after cell uncovered
    uncover() {
        if (this.isFlagged) {
            // when uncovering a flagged cell, the first uncover action merely removes the flag.
            this.toggleFlag();
        }
        else if (this.isEmpty() && this.isCovered) {
            this.covered = false;
            this.state = 1 /* uncovered */;
            const adjacentUncoveredCells = this.getAdjacentUncoveredCells();
            adjacentUncoveredCells.forEach((cellObj) => {
                cellObj.uncover();
            });
        }
        else {
            this.covered = false;
            this.state = 1 /* uncovered */;
        }
    }
    ;
}
exports.default = Cell;
