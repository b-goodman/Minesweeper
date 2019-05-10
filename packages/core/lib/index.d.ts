import Grid from "./Grid";
import Cell from "./Cell";
export interface Game {
    (rows: number, options: {
        mines?: number;
    }): Grid;
    new (): Grid;
}
declare const Game: (rows: number, options?: {
    mines?: number;
}) => Grid;
export default Game;
export { Cell };
//# sourceMappingURL=index.d.ts.map