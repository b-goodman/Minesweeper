import Cell from "./Cell";

export interface Coord extends Array<number> { 0: number, 1: number };

export interface CellUncoverData {
    this: Cell;
    adjacent: readonly Cell[];
};

export interface CellConstructor {
    coordinate: Coord,
    isMined: boolean,
    neighbouringMines: number,
}
