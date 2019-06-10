import Grid from "./Grid";
import Cell from "./Cell";
const Game = (rows, options = {}) => {
    new Grid(rows, options);
    return Grid;
};
export default Game;
export { Grid };
export { Cell };
//# sourceMappingURL=index.js.map