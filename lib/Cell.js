var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Minesweeper } from './Minesweeper';
import { EventEmitter } from 'events';
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(args) {
        var _this = _super.call(this) || this;
        _this.coordinate = args.coordinate;
        _this.mined = args.isMined;
        _this.neighbouringMines = args.neighbouringMines;
        _this.flagged = false;
        _this.covered = true;
        _this.highlight = false;
        return _this;
    }
    ;
    Object.defineProperty(Cell.prototype, "isFlagged", {
        get: function () {
            return this.flagged;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Returns new state of cell's flag.
     * Emits an event [CellEvents.UNFLAGGED] or [CellEvents.FLAGGED] depending on the change made.
     */
    Cell.prototype.toggleFlag = function () {
        this.flagged ? this.emit("unflagged" /* UNFLAGGED */) : this.emit("flagged" /* FLAGGED */);
        this.flagged = !this.flagged;
        return this.flagged;
    };
    ;
    Object.defineProperty(Cell.prototype, "isCovered", {
        get: function () {
            return this.covered;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Cell.prototype, "isMined", {
        get: function () {
            return this.mined;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Cell.prototype, "adjacentMines", {
        get: function () {
            return this.neighbouringMines;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Cell.prototype.isEmpty = function () {
        return !this.isFlagged && this.neighbouringMines === 0 && !this.isMined;
    };
    ;
    Cell.prototype.getAdjacentCells = function () {
        return Minesweeper.getAdjacentCoords(this.coordinate).map(function (pos) { return Minesweeper.getCell(pos); });
    };
    ;
    Cell.prototype.getAdjacentCoveredCells = function () {
        var allAdjCells = this.getAdjacentCells();
        // filter out coords for uncovered and flagged cells
        return allAdjCells.filter(function (cellObj) {
            return !cellObj.isFlagged && cellObj.isCovered;
        });
    };
    ;
    // TODO add callback for after cell uncovered
    Cell.prototype.uncover = function () {
        if (this.isFlagged) {
            // when uncovering a flagged cell, the first uncover action merely removes the flag.
            this.toggleFlag();
        }
        else if (this.isEmpty() && this.isCovered) {
            this.covered = false;
            this.emit("uncovered" /* UNCOVERED */);
            var adjacentUncoveredCells = this.getAdjacentCoveredCells();
            adjacentUncoveredCells.forEach(function (cellObj) {
                cellObj.uncover();
            });
        }
        else {
            this.covered = false;
            this.emit("uncovered" /* UNCOVERED */);
        }
    };
    ;
    return Cell;
}(EventEmitter));
export { Cell };
//# sourceMappingURL=Cell.js.map