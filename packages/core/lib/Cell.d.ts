import { Coord, CellUncoverData, CellConstructor } from './interfaces';
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
    getAdjacentUncoveredCoords(): readonly Coord[];
    getAdjacentCells(): readonly Cell[];
    private shouldChainUncover;
    private chainUncover;
    cellUncover(): CellUncoverData;
}
//# sourceMappingURL=Cell.d.ts.map