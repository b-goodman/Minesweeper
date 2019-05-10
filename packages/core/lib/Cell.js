"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = __importDefault(require("./Grid"));
class Cell {
    constructor(args) {
        this.coordinate = args.coordinate;
        this.mined = args.isMined;
        this.neighbouringMines = args.neighbouringMines;
        this.flagged = false;
        this.covered = true;
    }
    get isFlagged() {
        return this.flagged;
    }
    toggleFlag() {
        this.flagged = !this.flagged;
        return this;
    }
    get isCovered() {
        return this.covered;
    }
    get isMined() {
        return this.mined;
    }
    get adjacentMines() {
        return this.neighbouringMines;
    }
    isEmpty() {
        return !this.isFlagged && this.neighbouringMines === 0;
    }
    getAdjacentUncoveredCoords() {
        const allAdjCoords = Grid_1.default.getAdjacentCoords(this.coordinate);
        // filter out coords for uncovered and flagged cells
        return allAdjCoords.filter((coordinate) => {
            const cellObj = Grid_1.default.getCell(coordinate);
            return !cellObj.isFlagged && cellObj.isCovered;
        });
    }
    getAdjacentCells() {
        return Grid_1.default.getAdjacentCoords(this.coordinate).map(pos => Grid_1.default.getCell(pos));
    }
    shouldChainUncover() {
        const adj = this.getAdjacentCells();
        //check if any adjacents are 'empty'
        const borderingEmptyCells = adj.some(adjCell => adjCell.isEmpty());
        //if no adjacents are empty but this current cell is then chain uncover - this will be the last uncovering.
        const lastStepUncover = !borderingEmptyCells && this.isEmpty();
        // either case satisfies chain uncover, return true to trigger next recurvsive step.
        return borderingEmptyCells || lastStepUncover;
    }
    chainUncover() {
        this.covered = false;
        // Grid.checkAndSetCondition();
        if (this.isEmpty()) {
            // get neighbouring cells which are covered and qualify for chain uncovering
            const emptyAdjacentCells = this.getAdjacentCells().filter((adjCell) => {
                return adjCell.isCovered && adjCell.shouldChainUncover();
            });
            // recurse by having each of the qualified cells also chain uncover
            if (emptyAdjacentCells.length > 0) {
                return emptyAdjacentCells.map(cell => {
                    cell.chainUncover();
                    return cell;
                });
            }
        }
        ;
        return [this];
    }
    cellUncover() {
        const returnCase = { this: this, adjacent: [] };
        if (this.isFlagged) {
            // when uncovering a flagged cell, the first uncover action merely removes the flag.
            returnCase.this = this.toggleFlag();
        }
        else {
            const adjacentCells = this.chainUncover().flat(1);
            if (this.adjacentMines > 0) {
                const takeFrom = adjacentCells.indexOf(this);
                returnCase.adjacent = [...adjacentCells.slice(0, takeFrom), ...adjacentCells.slice(takeFrom + 1)];
            }
            else {
                returnCase.adjacent = adjacentCells;
            }
        }
        return returnCase;
    }
}
exports.default = Cell;
