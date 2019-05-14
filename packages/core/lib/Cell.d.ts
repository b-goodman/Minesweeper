import { Coord, CellConstructor } from './interfaces';
export default class Cell {
    private readonly mined;
    readonly coordinate: Coord;
    private readonly neighbouringMines;
    private covered;
    private flagged;
    constructor(args: CellConstructor);
    readonly isFlagged: boolean;
    toggleFlag(): Cell;
    readonly isCovered: boolean;
    readonly isMined: boolean;
    readonly adjacentMines: number;
    isEmpty(): boolean;
    getAdjacentCells(): readonly Cell[];
    getAdjacentUncoveredCells(): readonly Cell[];
    uncover(): void;
}
//# sourceMappingURL=Cell.d.ts.map