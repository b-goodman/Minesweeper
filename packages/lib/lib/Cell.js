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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9DZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBRzFCLE1BQXFCLElBQUk7SUFPdkIsWUFBYSxJQUFxQjtRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBR00sT0FBTztRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLDBCQUEwQjtRQUMvQixNQUFNLFlBQVksR0FBcUIsY0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRSxvREFBb0Q7UUFDcEQsT0FBTyxZQUFZLENBQUMsTUFBTSxD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