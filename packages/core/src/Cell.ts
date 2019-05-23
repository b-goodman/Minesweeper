import Grid from './Grid';
import { Coord, CellConstructor } from './interfaces';

export const enum CellStates {
  covered,
  uncovered,
  flagged
};

export default class Cell {
  private readonly mined: boolean;
  public readonly coordinate: Coord;
  private readonly neighbouringMines: number;
  public covered: boolean;
  public flagged: boolean;
  public highlight: boolean;
  public state: CellStates;

  constructor( args: CellConstructor ) {
    this.coordinate = args.coordinate;
    this.mined = args.isMined;
    this.neighbouringMines = args.neighbouringMines;
    this.flagged = false;
    this.covered = true;
    this.highlight = false;
    this.state = CellStates.covered;
  };

  get isFlagged(): boolean {
    return this.flagged;
  };

  public toggleFlag(): Cell {
    this.flagged = !this.flagged;
    this.state = this.flagged ? CellStates.covered : CellStates.uncovered;
    return this;
  };

  public toggleHighlight(): boolean {
    this.highlight = !this.highlight;
    return this.highlight;
  }

  public isHighlighted(): boolean {
    return this.highlight;
  }

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
    return !this.isFlagged && this.neighbouringMines === 0;
  };

  public getAdjacentCells(): readonly Cell[] {
    return Grid.getAdjacentCoords(this.coordinate).map(pos => Grid.getCell(pos));
  };

  public getAdjacentUncoveredCells(): readonly Cell[] {
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
      this.state = CellStates.uncovered;
      const adjacentUncoveredCells: readonly Cell[] = this.getAdjacentUncoveredCells();
      adjacentUncoveredCells.forEach( (cellObj) => {
        cellObj.uncover()
      });
    } else {
      this.covered = false;
      this.state = CellStates.uncovered;
    }
  };

}
