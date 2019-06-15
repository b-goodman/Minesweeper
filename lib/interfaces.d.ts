export interface Coord extends Array<number> {
    0: number;
    1: number;
}
export interface CellConstructor {
    coordinate: Coord;
    isMined: boolean;
    neighbouringMines: number;
}
export declare const enum CellEvents {
    UNCOVERED = "uncovered",
    FLAGGED = "flagged",
    UNFLAGGED = "unflagged"
}
//# sourceMappingURL=interfaces.d.ts.map