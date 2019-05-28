"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Geom, Loader,
const phaser_1 = require("phaser");
const CellObj_1 = __importDefault(require("./CellObj"));
const lib_1 = require("@minesweeper/core/lib");
const enums_1 = require("./enums");
//Color,
const enums_2 = require("./enums");
// import { Coord } from "@minesweeper/core/lib/interfaces"
const config = {
    key: "GridScene",
};
const defaultParams = {
    rows: 15,
    cellWidth: 60,
};
class GridScene extends phaser_1.Scene {
    constructor() {
        super(config);
        this.cellObjs = [];
        this.lClicks = 0;
        this.doubleClickDelay = 170;
    }
    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params = defaultParams) {
        new lib_1.Grid(params.rows, {});
        this.flagsRemaining = this.mines = lib_1.Grid.nMines;
        this.params = params;
        console.log(`init params: ${JSON.stringify(params)}`);
    }
    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload() {
        // this.load.atlas("tiles","assets/tileset.png","assets/minesweeper_tileset.json");
        this.load.image(enums_1.Textures.COVERED, "/assets/09.png");
        this.load.image(enums_1.UncoveredTextures.EMPTY, "/assets/10.png");
        this.load.image(enums_1.Textures.FLAGGED, "/assets/11.png");
        this.load.image(enums_1.Textures.HOVER, "/assets/12.png");
        this.load.image(enums_1.Textures.ADJACENT, "/assets/13.png");
        this.load.image(enums_1.Textures.MINED, "/assets/14.png");
        this.load.image(enums_1.UncoveredTextures.N01, "/assets/01.png");
        this.load.image(enums_1.UncoveredTextures.N02, "/assets/02.png");
        this.load.image(enums_1.UncoveredTextures.N03, "/assets/03.png");
        this.load.image(enums_1.UncoveredTextures.N04, "/assets/04.png");
        this.load.image(enums_1.UncoveredTextures.N05, "/assets/05.png");
        this.load.image(enums_1.UncoveredTextures.N06, "/assets/06.png");
        this.load.image(enums_1.UncoveredTextures.N07, "/assets/07.png");
        this.load.image(enums_1.UncoveredTextures.N08, "/assets/08.png");
    }
    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create() {
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
