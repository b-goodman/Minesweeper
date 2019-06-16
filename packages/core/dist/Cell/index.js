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
import { Grid } from '../Grid';
import events from "events";
;
export var CellEvents;
(function (CellEvents) {
    CellEvents["UNCOVERED"] = "uncovered";
    CellEvents["FLAGGED"] = "flagged";
    CellEvents["UNFLAGGED"] = "unflagged";
    CellEvents["MINE_UNCOVERED"] = "mine_uncovered";
})(CellEvents || (CellEvents = {}));
;
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(args) {
        var _this = _super.call(this) || this;
        _this.coordinate = args.coordinate;
        _this.mined = args.isMined;
        _this.adjacentMines = args.neighbouringMines;
        _this.flagged = false;
        _this.covered = true;
        _this.highlight = false;
        return _this;
    }
    ;
    Cell.prototype.toggleFlag = function () {
        this.flagged ? this.emit(CellEvents.UNFLAGGED) : this.emit(CellEvents.FLAGGED);
        this.flagged = !this.flagged;
        return this.flagged;
    };
    ;
    /**
     * Returns true if the cell is not flagged and has 0 adjacent mines; false otherwise.
     */
    Cell.prototype.isEmpty = function () {
        return !this.flagged && this.adjacentMines === 0 && !this.mined;
    };
    ;
    /**
     * Finds all Cell objects adjacent to this.
     * @returns {Cell[]} Array of adjacent Cell objects.
     */
    Cell.prototype.getAdjacentCells = function () {
        return Grid.getAdjacentCoords(this.coordinate).map(function (pos) { return Grid.getCell(pos); });
    };
    ;
    /**
     * Performs the same task as [getAdjacentCells] but filters out any uncovered cells found in the initial serach.
     * Filters according to [Cell.isEmpty]
     * @returns {Cell[]} Array of adjacent (uncovered) Cell objects.
     */
    Cell.prototype.getAdjacentCoveredCells = function () {
        var allAdjCells = this.getAdjacentCells();
        // filter out coords for uncovered and flagged cells
        return allAdjCells.filter(function (cellObj) {
            return !cellObj.flagged && cellObj.covered;
        });
    };
    ;
    /**
     * Sets this cell as uncovered and sets recursivley for all adjacent and empty cells.
     */
    Cell.prototype.uncover = function () {
        if (this.flagged) {
            // when uncovering a flagged cell, the first uncover action merely removes the flag.
            this.toggleFlag();
        }
        else if (this.isEmpty() && this.covered) {
            this.covered = false;
            this.emit(this.mined ? CellEvents.MINE_UNCOVERED : CellEvents.UNCOVERED);
            var adjacentUncoveredCells = this.getAdjacentCoveredCells();
            adjacentUncoveredCells.forEach(function (cellObj) {
                cellObj.uncover();
            });
        }
        else {
            this.covered = false;
            this.emit(this.mined ? CellEvents.MINE_UNCOVERED : CellEvents.UNCOVERED);
        }
    };
    ;
    /**
     * Adds a listener for the event triggered when this cell transitions to a new state.
     * @event CellEvents
     * @param callback
     */
    Cell.prototype.addEventListner = function (event, callback) {
        this.addListener(event, callback);
    };
    return Cell;
}(events.EventEmitter));
export { Cell };
//# sourceMappingURL=index.js.map