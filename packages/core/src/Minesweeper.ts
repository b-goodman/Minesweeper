import {Cell} from "./Cell";
import { Coord } from "./interfaces";

export class Minesweeper {

    public static nRows: number;
    public static nColumns: number;
    public static nMines: number;
    public static Cells: Cell[][];

    constructor(nRows:number, options:{mines?:number}={} ){
        Minesweeper.nRows = nRows;
        Minesweeper.nColumns = nRows;
        Minesweeper.nMines = options.mines || Math.floor(nRows + Math.pow(nRows, 1.3) ) - 3;

        /**
         * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
         */

        const fillRows = (rowIndex: number)  => {
            return new Array(Minesweeper.nRows).fill(undefined).map( (_elem, columnIndex) => {
                return ( {coordinate:<Coord>[rowIndex, columnIndex], isMined: false, neighbouringMines: 0} );
            });
        };

        const gridConstructor = new Array(Minesweeper.nColumns).fill(undefined).map( (_elem, rowIndex) => {
            return fillRows(rowIndex)
        });
        // set mines
        let minesRemaining = Minesweeper.nMines;
        do {
            for (let i = 0; i < Minesweeper.nRows; i++ ) {
                for (let j = 0; j < Minesweeper.nColumns; j++) {
                    if (Minesweeper.getRandomIntInclusive(1, 10) === 10 && !gridConstructor[i][j].isMined && minesRemaining > 0) {
                        gridConstructor[i][j].isMined = true;
                        minesRemaining--;
                    }
                }
            }
        }while (minesRemaining > 0);
        // set NNs
        for (let i = 0; i < Minesweeper.nRows; i++ ) {
            for (let j = 0; j < Minesweeper.nColumns; j++) {
                // get coords of current elem's clique and count how many have been mined.
                const nnMines: number = Minesweeper.getAdjacentCoords([i,j])
                    .map( (adjCellCoord) => {
                        const rowIndex = adjCellCoord[0];
                        const colIndex = adjCellCoord[1];
                        return gridConstructor[rowIndex][colIndex].isMined ? 1 : 0
                    })
                    .reduce((a, b) => a + b, 0);
                gridConstructor[i][j].neighbouringMines = nnMines;
            }
        };
        // construct cells
        Minesweeper.Cells = gridConstructor.map( elem => {
            return elem.map( inner => {
                return new Cell(inner) })
            });
    };

    private static getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    public static getAdjacentCoords(coord: Coord): readonly Coord[] {
        const isBound = (pos: Coord): boolean => {
            return (
                pos.every(p => p >= 0) &&
                pos[0] <= Minesweeper.nRows - 1 &&
                pos[1] <= Minesweeper.nColumns - 1
            );
        };
        const nn: ReadonlyArray<any> = [
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
    };

    public static getCell(coordinate: Coord): Cell {
        return  Minesweeper.Cells[coordinate[0]][coordinate[1]];
    };

    public static uncoverRemainingMines(): Cell[] {
        const mineCells: Cell[] = Minesweeper.Cells.flat(1).filter( (cell) => cell.isMined);
        mineCells.map( (cell) => cell.uncover());
        return mineCells;
    };

    // public static checkAndSetCondition() {
    //     if ( this.nMines === Grid.cells().filter( (cell) => cell.isCovered).length ) {
    //         this.loseCondition = true;
    //     }
    //     if ( Grid.cells().filter( (cell) => cell.isMined && !cell.isCovered ) ) {
    //         this.loseCondition = true;
    //     }
    // }


}
