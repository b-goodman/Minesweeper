import Grid from "./Grid";
import Cell from "./Cell";

const Game = ( rows:number, options:{mines?:number}={} ):Grid => {
		new Grid(rows, options);
		return Grid;
};

export default Game;
export {Grid};
export {Cell};

