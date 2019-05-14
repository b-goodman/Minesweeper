"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("./Cell"));
class Grid {
    constructor(nRows, opts) {
        Grid.nRows = nRows;
        Grid.nColumns = nRows;
        Grid.nMines = opts.mines || Math.floor(nRows + (Math.pow(nRows, 1.4) / 4)) - 3;
        const fillRows = (rowIndex) => {
            return new Array(Grid.nRows).fill(undefined).map((_elem, columnIndex) => {
                return ({ coordinate: [rowIndex, columnIndex], isMined: false, neighbouringMines: 0 });
            });
        };
        /**
         * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
         */
        const gridConstructor = new Array(Grid.nColumns).fill(undefined).map((_elem, rowIndex) => {
            return fillRows(rowIndex);
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
        Grid._Cells = gridConstructor.map(elem => {
            return elem.map(inner => {
                return new Cell_1.default(inner);
            });
        });
    }
    ;
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
    ;
    //
    // public static init(nRows, opts:{mines?:number}): Cell[][] {
    //     Grid.nRows = nRows;
    //     Grid.nColumns = nRows;
    //     Grid.nMines = opts.mines || Math.floor(nRows + (Math.pow(nRows, 1.4) / 4)) - 3;
    //     const fillRows = (rowIndex: number)  => {
    //         return new Array(Grid.nRows).fill(undefined).map( (_elem, columnIndex) => {
    //             return ( {coordinate:<Coord>[rowIndex, columnIndex], isMined: false, neighbouringMines: 0} );
    //         });
    //     };
    //     /**
    //      * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
    //      */
    //     const gridConstructor = new Array(Grid.nColumns).fill(undefined).map( (_elem, rowIndex) => {
    //         return fillRows(rowIndex)
    //     });
    //     // set mines
    //     let minesRemaining = Grid.nMines;
    //     do {
    //         for (let i = 0; i < Grid.nRows; i++ ) {
    //             for (let j = 0; j < Grid.nColumns; j++) {
    //                 if (Grid.getRandomIntInclusive(1, 10) === 10 && !gridConstructor[i][j].isMined && minesRemaining > 0) {
    //                     gridConstructor[i][j].isMined = true;
    //                     minesRemaining--;
    //                 }
    //             }
    //         }
    //     }while (minesRemaining > 0);
    //     // set NNs
    //     for (let i = 0; i < Grid.nRows; i++ ) {
    //         for (let j = 0; j < Grid.nColumns; j++) {
    //             // get coords of current elem's clique and count how many have been mined.
    //             const nnMines: number = Grid.getAdjacentCoords([i,j])
    //                 .map( (adjCellCoord) => {
    //                     const rowIndex = adjCellCoord[0];
    //                     const colIndex = adjCellCoord[1];
    //                     return gridConstructor[rowIndex][colIndex].isMined ? 1 : 0
    //                 })
    //                 .reduce((a, b) => a + b, 0);
    //             gridConstructor[i][j].neighbouringMines = nnMines;
    //         }
    //     };
    //     // construct cells
    //     Grid._Cells = gridConstructor.map( elem => {
    //         return elem.map( inner => {
    //             return new Cell(inner) })
    //         });
    //     return Grid.Cells;
    // }
    static get Cells() {
        return Grid._Cells;
    }
    ;
    static getCell(coordinate) {
        return Grid._Cells[coordinate[0]][coordinate[1]];
    }
    ;
    static uncoverRemainingMines() {
        const mineCells = Grid._Cells.flat(1).filter((cell) => cell.isMined);
        mineCells.map((cell) => cell.uncover());
        return mineCells;
    }
    ;
    static rows() {
        return this.nRows;
    }
    ;
    static columns() {
        return this.nColumns;
    }
    ;
    static get mines() {
        return this.nMines;
    }
    ;
}
exports.default = Grid;
