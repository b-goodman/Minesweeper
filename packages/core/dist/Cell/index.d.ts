/// <reference types="node" />
import events from "events";
export interface Coord extends Array<number> {
    0: number;
    1: number;
}
export interface CellConstructor {
    coordinate: Coord;
    isMined: boolean;
    neighbouringMines: number;
}
export declare enum CellEvents {
    UNCOVERED = "uncovered",
    FLAGGED = "flagged",
    UNFLAGGED = "unflagged",
    MINE_UNCOVERED = "mine_uncovered"
}
export declare class Cell extends events.EventEmitter {
    readonly mined: boolean;
    readonly coordinate: Coord;
    readonly adjacentMines: number;
    covered: boolean;
    flagged: boolean;
    highlight: boolean;
    constructor(args: CellConstructor);
    toggleFlag(): boolean;
    /**
     * Returns true if the cell is not flagged and has 0 adjacent mines; false otherwise.
     */
    isEmpty(): boolean;
    /**
     * Finds all Cell objects adjacent to this.
     * @returns {Cell[]} Array of adjacent Cell objects.
     */
    getAdjacentCells(): readonly Cell[];
    /**
     * Performs the same task as [getAdjacentCells] but filters out any uncovered cells found in the initial serach.
     * Filters according to [Cell.isEmpty]
     * @returns {Cell[]} Array of adjacent (uncovered) Cell objects.
     */
    getAdjacentCoveredCells(): readonly Cell[];
    /**
     * Sets this cell as uncovered and sets recursivley for all adjacent and empty cells.
     */
    uncover(): void;
    /**
     * Adds a listener for the event triggered when this cell transitions to a new state.
     * @event CellEvents
     * @param callback
     */
    addEventListner(event: CellEvents, callback: () => void): void;
}
//# sourceMappingURL=index.d.ts.map