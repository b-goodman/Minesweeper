import Grid from "./Grid";
import Cell from "./Cell";

export interface Game {
	( rows:number, options:{mines?:number} ):Grid
	new(): Grid;
}

const Game = ( rows:number, options:{mines?:number}={} ):Grid => {
		Grid.init(rows, options);
		return Grid;
};

export default Game;
export {Cell};