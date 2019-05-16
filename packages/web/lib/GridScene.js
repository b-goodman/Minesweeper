"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const lib_1 = require("@minesweeper/core/lib");
const config = {
    key: "GridScene"
};
class GridScene extends phaser_1.default.Scene {
    constructor() {
        super(config);
    }
    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params) {
        new lib_1.Grid(10, {});
        this.flagsRemaining = this.mines = lib_1.Grid.nMines;
        this.nRows = lib_1.Grid.nRows;
        console.log(`init params: ${params}`);
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
        // TODO
        const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff }, lineStyle: { color: 0x0000aa } });
        let rectangles = [];
        for (let x = 0; x < this.nRows; x++) {
            rectangles[x] = [];
            for (let y = 0; y < this.nRows; y++) {
                rectangles[x][y] = new phaser_1.default.Geom.Rectangle(x * 80, y * 60, 80, 60);
            }
        }
        ;
        console.log(rectangles);
        this.input.on('pointerdown', function (pointer) {
            var x = Math.floor(pointer.x / 80);
            var y = Math.floor(pointer.y / 60);
            rectangles[x][y].setEmpty();
            redraw();
        });
        const redraw = () => {
            graphics.clear();
            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    graphics.fillRectShape(rectangles[x][y]);
                    graphics.strokeRectShape(rectangles[x][y]);
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
