import { Coord, CellConstructor } from './interfaces';
export declare const enum CellStates {
    covered = 0,
    uncovered = 1,
    flagged = 2
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
    getAdjacentUncoveredCells(): readonly Cell[];
    uncover(): void;
}
//# sourceMappingURL=Cell.d.ts.map