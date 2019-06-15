"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../objects/enums");
const phaser_1 = require("phaser");
const CellObj_1 = __importDefault(require("../objects/CellObj"));
const lib_1 = require("@minesweeper/core/lib");
//Color,
const enums_2 = require("../objects/enums");
const Assets_1 = require("../objects/Assets");
// import { Coord } from "@minesweeper/core/lib/interfaces"
class GridScene extends phaser_1.Scene {
    constructor() {
        super({
            key: "GridScene",
        });
        this.cellObjs = [];
        this.lClicks = 0;
        this.doubleClickDelay = 170;
    }
    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params) {
        new lib_1.Grid(params.rows);
        this.mines = lib_1.Grid.nMines;
        this.params = params;
    }
    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload() {
        new Assets_1.Assets(this);
    }
    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create() {
        this.data.set("flagsRemaining", this.mines);
        this.data.set("timeElapsed", 0);
        this.data.set("isGameOver", false);
        Assets_1.Assets.addSounds();
        this.cellObjs = new Array(lib_1.Grid.nRows).fill(undefined).map((_elem, index_i) => {
            return new Array(lib_1.Grid.nRows).fill(undefined).map((_elem, index_j) => {
                const p0 = { x: (index_j * this.params.cellWidth) + this.params.cellWidth / 2, y: (index_i * this.params.cellWidth) + this.params.cellWidth / 2 };
                return this.add.existing(new CellObj_1.default(this, p0, { cellObj: lib_1.Grid.getCell([index_i, index_j]) }));
            });
        }).flat();
        // initialize event emitters.
        this.input.mouse.disableContextMenu();
        const handleClickInput = (pointer, gameObject, whichBtn) => {
            if (this.lClicks == 1) {
                gameObject.emit(enums_2.EmitterEvents.CLICKED, pointer, whichBtn);
            }
            else {
                gameObject.emit(enums_2.EmitterEvents.DOUBLE_CLICKED, pointer, whichBtn);
            }
            this.lClicks = 0;
        };
        const handleGameOver = () => {
            console.log("game over");
            lib_1.Grid.uncoverRemainingMines();
            this.cellObjs.forEach(obj => obj.disableInteractive());
            this.data.values.isGameOver = true;
        };
        this.input.on(enums_2.InputEventType.GAMEOBJECT_DOWN, (pointer, gameObject) => {
            const whichBtn = pointer.rightButtonDown() ? enums_2.EmitterEvents.POINTER_RIGHT : enums_2.EmitterEvents.POINTER_LEFT;
            this.lClicks++;
            this.time.delayedCall(this.doubleClickDelay, handleClickInput, [pointer, gameObject, whichBtn], this);
        });
        this.input.on(enums_2.InputEventType.GAMEOBJECT_OVER, (_pointer, gameObject) => {
            gameObject.emit(enums_2.EmitterEvents.HOVER_IN, _pointer);
        });
        this.input.on(enums_2.InputEventType.GAMEOBJECT_OUT, (_pointer, gameObject) => {
            gameObject.emit(enums_2.EmitterEvents.HOVER_OUT, _pointer);
        });
        this.events.once(enums_1.GameEvents.MINE_REVEALED, () => {
            Assets_1.Assets.Sounds.get(enums_1.SoundKeys.MINE_UNCOVER_1).play();
            handleGameOver();
        });
        this.events.on(enums_1.GameEvents.CELL_FLAGGED, () => {
            Assets_1.Assets.Sounds.get(enums_1.SoundKeys.FLAGGED_2).play();
        });
        this.events.on(enums_1.GameEvents.CELL_UNFLAGGED, () => {
            Assets_1.Assets.Sounds.get(enums_1.SoundKeys.UNFLAG_1).play();
        });
        this.events.on(enums_1.GameEvents.CELL_UNCOVERED, () => {
            Assets_1.Assets.Sounds.get(enums_1.SoundKeys.UNCOVERED_1).play();
        });
        this.data.events.on("changekey-flagsRemaining", (_parent, _key, value, prevValue) => {
            console.log(`value:${prevValue} new value:${value}`);
        });
    }
    /**
     * Called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param [time]
     */
    update() {
        // TODO
        this.cellObjs.forEach(obj => obj.refreshState());
    }
}
exports.default = GridScene;
//# sourceMappingURL=GridScene.js.map