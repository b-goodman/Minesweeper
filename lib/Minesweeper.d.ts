import { Cell } from "./Cell";
import { Coord } from "./interfaces";
export declare class Minesweeper {
    static nRows: number;
    static nColumns: number;
    static nMines: number;
    private static _Cells;
    constructor(nRows: number, { mines }?: {
        mines?: number;
    });
    private static getRandomIntInclusive;
    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    static getAdjacentCoords(coord: Coord): readonly Coord[];
    static readonly Cells: Cell[][];
    static getCell(coordinate: Coord): Cell;
    static uncoverRemainingMines(): Cell[];
    static rows(): number;
    static columns(): number;
    static readonly mines: number;
}
//# sourceMappingURL=Minesweeper.d.ts.map