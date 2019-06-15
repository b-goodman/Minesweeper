import {Minesweeper} from './Minesweeper';
import { Coord, CellConstructor, CellEvents } from './interfaces';
import events from "events";

export class Cell extends events.EventEmitter {
  private readonly mined: boolean;
  public readonly coordinate: Coord;
  private readonly neighbouringMines: number;
  public covered: boolean;
  public flagged: boolean;
  public highlight: boolean;

  constructor( args: CellConstructor ) {
    super();
    this.coordinate = args.coordinate;
    this.mined = args.isMined;
    this.neighbouringMines = args.neighbouringMines;
    this.flagged = false;
    this.covered = true;
    this.highlight = false;
  };

  get isFlagged(): boolean {
    return this.flagged;
  };

  /**
   * Returns new state of cell's flag.
   * Emits an event [CellEvents.UNFLAGGED] or [CellEvents.FLAGGED] depending on the change made.
   */
  public toggleFlag(): boolean {
    this.flagged ? this.emit(CellEvents.UNFLAGGED) : this.emit( CellEvents.FLAGGED );
    this.flagged = !this.flagged;
    return this.flagged;
  };

  get isCovered(): boolean {
    return this.covered;
  };

  get isMined(): boolean {
    return this.mined;
  };

  get adjacentMines(): number {
    return this.neighbouringMines;
  };

  public isEmpty(): boolean {
    return !this.isFlagged && this.neighbouringMines === 0 && !this.isMined;
  };

  public getAdjacentCells(): readonly Cell[] {
    return Minesweeper.getAdjacentCoords(this.coordinate).map(pos => Minesweeper.getCell(pos));
  };

  public getAdjacentCoveredCells(): readonly Cell[] {
    const allAdjCells: readonly Cell[] = this.getAdjacentCells();
    // filter out coords for uncovered and flagged cells
    return allAdjCells.filter( (cellObj) => {
      return !cellObj.isFlagged && cellObj.isCovered;
    });
  };

  // TODO add callback for after cell uncovered
  public uncover(): void {
    if (this.isFlagged) {
      // when uncovering a flagged cell, the first uncover action merely removes the flag.
      this.toggleFlag();
    } else if ( this.isEmpty() && this.isCovered ) {
      this.covered = false;
      this.emit( CellEvents.UNCOVERED );
      const adjacentUncoveredCells: readonly Cell[] = this.getAdjacentCoveredCells();
      adjacentUncoveredCells.forEach( (cellObj) => {
        cellObj.uncover()
      });
    } else {
      this.covered = false;
      this.emit( CellEvents.UNCOVERED );
    }
  };

}
