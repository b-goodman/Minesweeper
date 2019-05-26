import { Coord, CellConstructor } from './interfaces';
export declare const enum CellStates {
    COVERED = 0,
    UNCOVERED = 1,
    FLAGGED = 2
}
export default class Cell {
    private readonly mined;
    readonly coordinate: Coord;
    private readonly neighbouringMines;
    covered: boolean;
    flagged: boolean;
    highlight: boolean;
    state: CellStates;
    constructor(args: CellConstructor);
    readonly isFlagged: boolean;
    toggleFlag(): Cell;
    toggleHighlight(): boolean;
    isHighlighted(): boolean;
    readonly isCovered: boolean;
    readonly isMined: boolean;
    readonly adjacentMines: number;
    isEmpty(): boolean;
    getAdjacentCells(): readonly Cell[];
    getAdjacentCoveredCells(): readonly Cell[];
    uncover(): void;
}
//# sourceMappingURL=Cell.d.ts.map