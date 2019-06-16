import { Cell } from "../Cell";
var Grid = /** @class */ (function () {
    function Grid(nRows, options) {
        if (options === void 0) { options = {}; }
        Grid.nRows = nRows;
        Grid.nColumns = nRows;
        Grid.nMines = options.mines || Math.floor(nRows + Math.pow(nRows, 1.3)) - 3;
        /**
         * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
         */
        var fillRows = function (rowIndex) {
            return new Array(Grid.nRows).fill(undefined).map(function (_elem, columnIndex) {
                return ({ coordinate: [rowIndex, columnIndex], isMined: false, neighbouringMines: 0 });
            });
        };
        var gridConstructor = new Array(Grid.nColumns).fill(undefined).map(function (_elem, rowIndex) {
            return fillRows(rowIndex);
        });
        // set mines
        var minesRemaining = Grid.nMines;
        do {
            for (var i = 0; i < Grid.nRows; i++) {
                for (var j = 0; j < Grid.nColumns; j++) {
                    if (Grid.getRandomIntInclusive(1, 10) === 10 && !gridConstructor[i][j].isMined && minesRemaining > 0) {
                        gridConstructor[i][j].isMined = true;
                        minesRemaining--;
                    }
                }
            }
        } while (minesRemaining > 0);
        // set NNs
        for (var i = 0; i < Grid.nRows; i++) {
            for (var j = 0; j < Grid.nColumns; j++) {
                // get coords of current elem's clique and count how many have been mined.
                var nnMines = Grid.getAdjacentCoords([i, j])
                    .map(function (adjCellCoord) {
                    var rowIndex = adjCellCoord[0];
                    var colIndex = adjCellCoord[1];
                    return gridConstructor[rowIndex][colIndex].isMined ? 1 : 0;
                })
                    .reduce(function (a, b) { return a + b; }, 0);
                gridConstructor[i][j].neighbouringMines = nnMines;
            }
        }
        ;
        // construct cells
        Grid.Cells = gridConstructor.map(function (elem) {
            return elem.map(function (inner) {
                return new Cell(inner);
            });
        });
    }
    ;
    Grid.getRandomIntInclusive = function (min, max) {
        var _min = Math.ceil(min);
        var _max = Math.floor(max);
        return Math.floor(Math.random() * (_max - _min + 1)) + min;
    };
    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    Grid.getAdjacentCoords = function (coord) {
        var isBound = function (pos) {
            return (pos.every(function (p) { return p >= 0; }) &&
                pos[0] <= Grid.nRows - 1 &&
                pos[1] <= Grid.nColumns - 1);
        };
        var nn = [
            [coord[0] - 1, coord[1] - 1],
            [coord[0] - 1, coord[1]],
            [coord[0] - 1, coord[1] + 1],
            [coord[0], coord[1] - 1],
            // exclude self
            [coord[0], coord[1] + 1],
            [coord[0] + 1, coord[1] - 1],
            [coord[0] + 1, coord[1]],
            [coord[0] + 1, coord[1] + 1]
        ];
        return nn.filter(isBound);
    };
    ;
    Grid.getCell = function (coordinate) {
        return Grid.Cells[coordinate[0]][coordinate[1]];
    };
    ;
    Grid.uncoverRemainingMines = function () {
        var mineCells = Grid.Cells.flat(1).filter(function (cell) { return cell.mined; });
        mineCells.map(function (cell) { return cell.uncover(); });
        return mineCells;
    };
    ;
    return Grid;
}());
export { Grid };
//# sourceMappingURL=index.js.map