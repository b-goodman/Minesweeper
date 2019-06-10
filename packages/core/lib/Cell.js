import Grid from './Grid';
;
export default class Cell {
    constructor(args) {
        this.coordinate = args.coordinate;
        this.mined = args.isMined;
        this.neighbouringMines = args.neighbouringMines;
        this.flagged = false;
        this.covered = true;
        this.highlight = false;
        this.state = 0 /* COVERED */;
    }
    ;
    get isFlagged() {
        return this.flagged;
    }
    ;
    toggleFlag() {
        this.flagged = !this.flagged;
        this.state = this.flagged ? 0 /* COVERED */ : 1 /* UNCOVERED */;
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
        return !this.isFlagged && this.neighbouringMines === 0 && !this.isMined;
    }
    ;
    getAdjacentCells() {
        return Grid.getAdjacentCoords(this.coordinate).map(pos => Grid.getCell(pos));
    }
    ;
    getAdjacentCoveredCells() {
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
            this.state = 1 /* UNCOVERED */;
            const adjacentUncoveredCells = this.getAdjacentCoveredCells();
            adjacentUncoveredCells.forEach((cellObj) => {
                cellObj.uncover();
            });
        }
        else {
            this.covered = false;
            this.state = 1 /* UNCOVERED */;
        }
    }
    ;
}
//# sourceMappingURL=Cell.js.map