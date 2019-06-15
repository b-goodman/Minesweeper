/// <reference types="node" />
import { Coord, CellConstructor } from './interfaces';
import events from "events";
export declare class Cell extends events.EventEmitter {
    private readonly mined;
    readonly coordinate: Coord;
    private readonly neighbouringMines;
    covered: boolean;
    flagged: boolean;
    highlight: boolean;
    constructor(args: CellConstructor);
    readonly isFlagged: boolean;
    /**
     * Returns new state of cell's flag.
     * Emits an event [CellEvents.UNFLAGGED] or [CellEvents.FLAGGED] depending on the change made.
     */
    toggleFlag(): boolean;
    readonly isCovered: boolean;
    readonly isMined: boolean;
    readonly adjacentMines: number;
    isEmpty(): boolean;
    getAdjacentCells(): readonly Cell[];
    getAdjacentCoveredCells(): readonly Cell[];
    uncover(): void;
}
//# sourceMappingURL=Cell.d.ts.map