import Cell from "./Cell";
import { Coord } from "./interfaces";
export default class Grid {
    private static nRows;
    private static nColumns;
    private static nMines;
    static Cells: Cell[][];
    constructor(nRows: number);
    private static getRandomIntInclusive;
    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    static getAdjacentCoords(coord: Coord): readonly Coord[];
    private static init;
    static getCell(coordinate: Coord): Cell;
    static uncoverRemainingMines(): Cell[];
    static rows(): number;
    static columns(): number;
    static readonly mines: number;
}
