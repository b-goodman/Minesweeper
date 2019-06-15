import { Cell } from "./Cell";
var Minesweeper = /** @class */ (function () {
    function Minesweeper(nRows, _a) {
        var mines = (_a === void 0 ? {} : _a).mines;
        Minesweeper.nRows = nRows;
        Minesweeper.nColumns = nRows;
        Minesweeper.nMines = mines || Math.floor(nRows + Math.pow(nRows, 1.3)) - 3;
        /**
         * gridConstructor will hold the constructor arguments for the Cell which shall take it's place in the array's elements
         */
        var fillRows = function (rowIndex) {
            return new Array(Minesweeper.nRows).fill(undefined).map(function (_elem, columnIndex) {
                return ({ coordinate: [rowIndex, columnIndex], isMined: false, neighbouringMines: 0 });
            });
        };
        var gridConstructor = new Array(Minesweeper.nColumns).fill(undefined).map(function (_elem, rowIndex) {
            return fillRows(rowIndex);
        });
        // set mines
        var minesRemaining = Minesweeper.nMines;
        do {
            for (var i = 0; i < Minesweeper.nRows; i++) {
                for (var j = 0; j < Minesweeper.nColumns; j++) {
                    if (Minesweeper.getRandomIntInclusive(1, 10) === 10 && !gridConstructor[i][j].isMined && minesRemaining > 0) {
                        gridConstructor[i][j].isMined = true;
                        minesRemaining--;
                    }
                }
            }
        } while (minesRemaining > 0);
        // set NNs
        for (var i = 0; i < Minesweeper.nRows; i++) {
            for (var j = 0; j < Minesweeper.nColumns; j++) {
                // get coords of current elem's clique and count how many have been mined.
                var nnMines = Minesweeper.getAdjacentCoords([i, j])
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
        Minesweeper._Cells = gridConstructor.map(function (elem) {
            return elem.map(function (inner) {
                return new Cell(inner);
            });
        });
    }
    ;
    Minesweeper.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /**
     * Gets the coordinates of the neighbouring Cells which form a clique of the speciifed Cell.
     * @param {Coord} - Center of cell clique.
     * @returns {readonly Coord[]} - Array of coordinates of clique members.
     */
    Minesweeper.getAdjacentCoords = function (coord) {
        var isBound = function (pos) {
            return (pos.every(function (p) { return p >= 0; }) &&
                pos[0] <= Minesweeper.rows() - 1 &&
                pos[1] <= Minesweeper.columns() - 1);
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
    Object.defineProperty(Minesweeper, "Cells", {
        get: function () {
            return Minesweeper._Cells;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Minesweeper.getCell = function (coordinate) {
        return Minesweeper._Cells[coordinate[0]][coordinate[1]];
    };
    ;
    Minesweeper.uncoverRemainingMines = function () {
        var mineCells = Minesweeper._Cells.flat(1).filter(function (cell) { return cell.isMined; });
        mineCells.map(function (cell) { return cell.uncover(); });
        return mineCells;
    };
    ;
    Minesweeper.rows = function () {
        return this.nRows;
    };
    ;
    Minesweeper.columns = function () {
        return this.nColumns;
    };
    ;
    Object.defineProperty(Minesweeper, "mines", {
        get: function () {
            return this.nMines;
        },
        enumerable: true,
        configurable: true
    });
    ;
    return Minesweeper;
}());
export { Minesweeper };
//# sourceMappingURL=Minesweeper.js.map