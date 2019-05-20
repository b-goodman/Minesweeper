"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const lib_1 = require("@minesweeper/core/lib");
const config = {
    key: "GridScene",
};
const defaultParams = {
    rows: 10,
    cellWidth: 60,
};
const createCellGeom = (params) => {
    let geomArray = [];
    for (let x = 0; x < params.rows; x++) {
        geomArray[x] = [];
        for (let y = 0; y < params.rows; y++) {
            geomArray[x][y] = new phaser_1.default.Geom.Rectangle(x * params.cellWidth, y * params.cellWidth, params.cellWidth, params.cellWidth);
        }
    }
    ;
    return geomArray;
};
const cellGraphicsStyle = () => {
    return {
        fillStyle: {
            color: 0x0000ff
        },
        lineStyle: {
            color: 0x0000aa
        }
    };
};
class GridScene extends phaser_1.default.Scene {
    constructor() {
        super(config);
        this.cellGeom = [[]];
    }
    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params = defaultParams) {
        new lib_1.Grid(params.rows, {});
        this.flagsRemaining = this.mines = lib_1.Grid.nMines;
        this.cellGeom = createCellGeom(params);
        this.params = params;
        console.log(`init params: ${JSON.stringify(params)}`);
    }
    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload() {
        // TODO
    }
    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create() {
        const graphics = this.add.graphics(cellGraphicsStyle());
        // const cellGeometry = createCellGeom(this.params);
        // cellGeometry.forEach( (rowArray:Phaser.Geom.Rectangle[]) => {
        //     rowArray.forEach( (cellGeom) => {
        //         this.add.graphics
        //     })
        // })
        console.log(this.cellGeom);
        this.input.on('pointerdown', (pointer) => {
            var x = Math.floor(pointer.x / this.params.cellWidth);
            var y = Math.floor(pointer.y / this.params.cellWidth);
            graphics.fillStyle(0xaa0000);
            graphics.fillRectShape(this.cellGeom[x][y]);
            // redraw();
        });
        const redraw = () => {
            graphics.clear();
            for (var x = 0; x < this.params.rows; x++) {
                for (var y = 0; y < this.params.rows; y++) {
                    graphics.fillRectShape(this.cellGeom[x][y]);
                    graphics.strokeRectShape(this.cellGeom[x][y]);
                }
            }
        };
        redraw();
    }
    /**
     * Called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param [time]
     */
    update() {
        // TODO
    }
}
exports.default = GridScene;
