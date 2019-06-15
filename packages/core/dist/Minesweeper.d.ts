import { Cell } from "./Cell";
import { Coord } from "./interfaces";
export declare class Minesweeper {
    static nRows: number;
    static nColumns: number;
    static nMines: number;
    static Cells: Cell[][];
    constructor(nRows: number, options?: {
        mines?: number;
    });
    private static getRandomIntInclusive;
    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    static getAdjacentCoords(coord: Coord): readonly Coord[];
    static getCell(coordinate: Coord): Cell;
    static uncoverRemainingMines(): Cell[];
}
//# sourceMappingURL=Minesweeper.d.ts.map