import Grid from "./Grid";
import Cell, {CellStates} from "./Cell";

const Game = ( rows:number, options:{mines?:number}={} ):Grid => {
		new Grid(rows, options);
		return Grid;
};

export default Game;
export {Grid};
export {Cell};
export {CellStates};

