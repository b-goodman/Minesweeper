import { Coord, CellConstructor } from './interfaces';
export default class Cell {
    private readonly mined;
    readonly coordinate: Coord;
    private readonly neighbouringMines;
    covered: boolean;
    flagged: boolean;
    highlight: boolean;
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