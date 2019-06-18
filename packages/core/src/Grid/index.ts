import {Cell, Coord} from "../Cell";

export class Grid {

    public static nRows: number;
    public static nColumns: number;
    public static nMines: number;
    public static Cells: Cell[][];

    constructor(nRows:number, options:{mines?:number}={} ){
        Grid.nRows = nRows;
        Grid.nColumns = nRows;
        Grid.nMines = options.mines || Math.floor(nRows/2 + Math.pow(nRows, 1.2) );

        /**
         * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
         */

        const fillRows = (rowIndex: number)  => {
            return new Array(Grid.nRows).fill(undefined).map( (_elem, columnIndex) => {
                return ( {coordinate:<Coord>[rowIndex, columnIndex], isMined: false, neighbouringMines: 0} );
            });
        };

        const gridConstructor = new Array(Grid.nColumns).fill(undefined).map( (_elem, rowIndex) => {
            return fillRows(rowIndex)
        });
        // set mines
        let minesRemaining = Grid.nMines;
        do {
            for (let i = 0; i < Grid.nRows; i++ ) {
                for (let j = 0; j < Grid.nColumns; j++) {
                    if (Grid.getRandomIntInclusive(1, 10) === 10 && !gridConstructor[i][j].isMined && minesRemaining > 0) {
                        gridConstructor[i][j].isMined = true;
                        minesRemaining--;
                    }
                }
            }
        }while (minesRemaining > 0);
        // set NNs
        for (let i = 0; i < Grid.nRows; i++ ) {
            for (let j = 0; j < Grid.nColumns; j++) {
                // get coords of current elem's clique and count how many have been mined.
                const nnMines: number = Grid.getAdjacentCoords([i,j])
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
        Grid.Cells = gridConstructor.map( elem => {
            return elem.map( inner => {
                return new Cell(inner) })
            });
    };

    private static getRandomIntInclusive(min: number, max: number): number {
        const _min = Math.ceil(min);
        const _max = Math.floor(max);
        return Math.floor(Math.random() * (_max - _min + 1)) + min;
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
                pos[0] <= Grid.nRows - 1 &&
                pos[1] <= Grid.nColumns - 1
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
        return  Grid.Cells[coordinate[0]][coordinate[1]];
    };

    public static uncoverRemainingMines(): Cell[] {
        const mineCells: Cell[] = Grid.Cells.flat(1).filter( (cell) => cell.mined);
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
