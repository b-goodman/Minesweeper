"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("./Cell"));
class Grid {
    constructor(nRows) {
        Grid.nRows = nRows;
        Grid.nColumns = nRows;
        Grid.nMines = Math.floor(nRows + (Math.pow(nRows, 1.4) / 4)) - 3;
        Grid.Cells = Grid.init();
        // Grid.loseCondition = false;
    }
    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    static getAdjacentCoords(coord) {
        const isBound = (pos) => {
            return (pos.every(p => p >= 0) &&
                pos[0] <= Grid.rows() - 1 &&
                pos[1] <= Grid.columns() - 1);
        };
        const nn = [
            [coord[0] - 1, coord[1] - 1],
            [coord[0] - 1, coord[1]],
            [coord[0] - 1, coord[1] + 1],
            [coord[0], coord[1] - 1],
            // exclude self
            [coord[0], coord[1] + 1],
            [coord[0] + 1, coord[1] - 1],
            [coord[0] + 1, coord[1]],
            [coord[0] + 1, coord[1] + 1]
        ];
        return nn.filter(isBound);
    }
    //
    static init() {
        const fillRows = (columnIndex) => {
            return new Array(Grid.nRows).fill(undefined).map((_elem, rowIndex) => {
                return ({ coordinate: [rowIndex, columnIndex], isMined: false, neighbouringMines: 0 });
            });
        };
        /**
         * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
         */
        const gridConstructor = new Array(Grid.nColumns).fill(undefined).map((_elem, columnIndex) => {
            return fillRows(columnIndex);
        });
        // set mines
        let minesRemaining = Grid.nMines;
        do {
            for (let i = 0; i < Grid.nRows; i++) {
                for (let j = 0; j < Grid.nColumns; j++) {
                    if (Grid.getRandomIntInclusive(1, 10) === 10 && !gridConstructor[i][j].isMined && minesRemaining > 0) {
                        gridConstructor[i][j].isMined = true;
                        minesRemaining--;
                    }
                }
            }
        } while (minesRemaining > 0);
        // set NNs
        for (let i = 0; i < Grid.nRows; i++) {
            for (let j = 0; j < Grid.nColumns; j++) {
                // get coords of current elem's clique and count how many have been mined.
                const nnMines = Grid.getAdjacentCoords([i, j])
                    .map((adjCellCoord) => {
                    const rowIndex = adjCellCoord[0];
                    const colIndex = adjCellCoord[1];
                    return gridConstructor[rowIndex][colIndex].isMined ? 1 : 0;
                })
                    .reduce((a, b) => a + b, 0);
                gridConstructor[i][j].neighbouringMines = nnMines;
            }
        }
        ;
        // construct cells
        return gridConstructor.map(elem => {
            return elem.map(inner => {
                return new Cell_1.default(inner);
            });
        });
    }
    static getCell(coordinate) {
        return Grid.Cells[coordinate[0]][coordinate[1]];
    }
    static uncoverRemainingMines() {
        const mineCells = Grid.Cells.flat(1).filter((cell) => cell.isMined);
        mineCells.map((cell) => cell.cellUncover());
        return mineCells;
    }
    static rows() {
        return this.nRows;
    }
    static columns() {
        return this.nColumns;
    }
    static get mines() {
        return this.nMines;
    }
}
exports.default = Grid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9HcmlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBSTFCLE1BQXFCLElBQUk7SUFRckIsWUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6Qiw4QkFBOEI7SUFDbEMsQ0FBQztJQUVPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUN6RCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFZO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBVSxFQUFXLEVBQUU7WUFDcEMsT0FBTyxDQUNILEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFD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