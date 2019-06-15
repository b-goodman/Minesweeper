import { Minesweeper } from "./Minesweeper";
// import {Cell} from "./Cell";
var Game = function (rows, options) {
    if (options === void 0) { options = {}; }
    new Minesweeper(rows, options);
    return Minesweeper;
};
export default Game;
// export {Minesweeper as Grid};
// export {Cell};
//# sourceMappingURL=index.js.map