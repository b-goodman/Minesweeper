import Grid from './Grid';
import { Coord, CellUncoverData, CellConstructor } from './interfaces';

export default class Cell {
  private readonly mined: boolean;
  public readonly coordinate: Coord;
  private readonly neighbouringMines: number;
  private covered: boolean;
  private flagged: boolean;

  constructor( args: CellConstructor ) {
    this.coordinate = args.coordinate;
    this.mined = args.isMined;
    this.neighbouringMines = args.neighbouringMines;
    this.flagged = false;
    this.covered = true;
  }

  get isFlagged(): boolean {
    return this.flagged;
  }

  public toggleFlag(): Cell {
    this.flagged = !this.flagged;
    return this;
  }

  get isCovered(): boolean {
    return this.covered;
  }

  get isMined(): boolean {
    return this.mined;
  }

  get adjacentMines(): number {
    return this.neighbouringMines;
  }

  public isEmpty(): boolean {
    return !this.isFlagged && this.neighbouringMines === 0;
  }

  public getAdjacentUncoveredCoords(): readonly Coord[] {
    const allAdjCoords: readonly Coord[] = Grid.getAdjacentCoords(this.coordinate);
    // filter out coords for uncovered and flagged cells
    return allAdjCoords.filter( (coordinate) => {
      const cellObj = Grid.getCell(coordinate);
      return !cellObj.isFlagged && cellObj.isCovered;
    });
  }

  public getAdjacentCells(): readonly Cell[] {
    return Grid.getAdjacentCoords(this.coordinate).map(pos => Grid.getCell(pos));
  }

  private shouldChainUncover(): boolean {
    const adj = this.getAdjacentCells();
    //check if any adjacents are 'empty'
    const borderingEmptyCells: boolean = adj.some(adjCell => adjCell.isEmpty());
    //if no adjacents are empty but this current cell is then chain uncover - this will be the last uncovering.
    const lastStepUncover: boolean = !borderingEmptyCells && this.isEmpty();
    // either case satisfies chain uncover, return true to trigger next recurvsive step.
    return borderingEmptyCells || lastStepUncover;
  }

  private chainUncover() {
    this.covered = false;
    // Grid.checkAndSetCondition();
    if (this.isEmpty()) {
      // get neighbouring cells which are covered and qualify for chain uncovering
      const emptyAdjacentCells = this.getAdjacentCells().filter( (adjCell) => {
        return adjCell.isCovered && adjCell.shouldChainUncover();
      });
      // recurse by having each of the qualified cells also chain uncover
      if (emptyAdjacentCells.length > 0) {
        return emptyAdjacentCells.map(cell => {
          cell.chainUncover();
          return cell;
        });
      }
    };
    return [<Cell>this];
  }

  public cellUncover(): CellUncoverData {
    const returnCase: CellUncoverData = { this: this, adjacent: [] };
    if (this.isFlagged) {
      // when uncovering a flagged cell, the first uncover action merely removes the flag.
      returnCase.this = this.toggleFlag();
    } else {
      const adjacentCells: readonly Cell[] = this.chainUncover().flat(1)
      if (this.adjacentMines > 0) {
        const takeFrom: number = adjacentCells.indexOf(this);
        returnCase.adjacent = [...adjacentCells.slice(0, takeFrom), ...adjacentCells.slice(takeFrom + 1)];
      } else {
      returnCase.adjacent = adjacentCells;
      }
    }
    return returnCase;
  }

}
