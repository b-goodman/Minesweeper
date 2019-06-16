import {Grid} from '../Grid';
import events from "events";

export interface Coord extends Array<number> { 0: number, 1: number };

export interface CellConstructor {
    coordinate: Coord, isMined: boolean, neighbouringMines: number,
}

export enum CellEvents {
    UNCOVERED = "uncovered",
    FLAGGED = "flagged",
    UNFLAGGED = "unflagged",
    MINE_UNCOVERED = "mine_uncovered",
};

export class Cell extends events.EventEmitter {
  public readonly mined: boolean;
  public readonly coordinate: Coord;
  public readonly adjacentMines: number;
  public covered: boolean;
  public flagged: boolean;
  public highlight: boolean;

  constructor( args: CellConstructor ) {
    super();
    this.coordinate = args.coordinate;
    this.mined = args.isMined;
    this.adjacentMines = args.neighbouringMines;
    this.flagged = false;
    this.covered = true;
    this.highlight = false;
  };

  public toggleFlag(): boolean {
    this.flagged ? this.emit(CellEvents.UNFLAGGED) : this.emit( CellEvents.FLAGGED );
    this.flagged = !this.flagged;
    return this.flagged;
  };

  /**
   * Returns true if the cell is not flagged and has 0 adjacent mines; false otherwise.
   */
  public isEmpty(): boolean {
    return !this.flagged && this.adjacentMines === 0 && !this.mined;
  };

  /**
   * Finds all Cell objects adjacent to this.
   * @returns {Cell[]} Array of adjacent Cell objects.
   */
  public getAdjacentCells(): readonly Cell[] {
    return Grid.getAdjacentCoords(this.coordinate).map(pos => Grid.getCell(pos));
  };

  /**
   * Performs the same task as [getAdjacentCells] but filters out any uncovered cells found in the initial serach.
   * Filters according to [Cell.isEmpty]
   * @returns {Cell[]} Array of adjacent (uncovered) Cell objects.
   */
  public getAdjacentCoveredCells(): readonly Cell[] {
    const allAdjCells: readonly Cell[] = this.getAdjacentCells();
    // filter out coords for uncovered and flagged cells
    return allAdjCells.filter( (cellObj) => {
      return !cellObj.flagged && cellObj.covered;
    });
  };

  /**
   * Sets this cell as uncovered and sets recursivley for all adjacent and empty cells.
   */
  public uncover(): void {
    if (this.flagged) {
      // when uncovering a flagged cell, the first uncover action merely removes the flag.
      this.toggleFlag();
    } else if ( this.isEmpty() && this.covered ) {
      this.covered = false;
      this.emit( this.mined ? CellEvents.MINE_UNCOVERED : CellEvents.UNCOVERED );
      const adjacentUncoveredCells: readonly Cell[] = this.getAdjacentCoveredCells();
      adjacentUncoveredCells.forEach( (cellObj) => {
        cellObj.uncover()
      });
    } else {
      this.covered = false;
      this.emit( this.mined ? CellEvents.MINE_UNCOVERED : CellEvents.UNCOVERED );
    }
  };

    /**
     * Adds a listener for the event triggered when this cell transitions to a new state.
     * @event CellEvents
     * @param callback
     */
  public addEventListner(event: CellEvents, callback: ()=>void): void {
    this.addListener( event, callback )
  }


}
