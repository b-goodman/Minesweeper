import Phaser from "phaser";
import {Grid} from "@minesweeper/core/lib";

const config = {
    key: "GridScene"
}

interface initParams {
    rows: number
}

export default class GridScene extends Phaser.Scene {
    mines: number;
    flagsRemaining: number;
    nRows: number;

    constructor(){
        super(config);
    }

    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params:initParams): void {
        new Grid(10,{});
        this.flagsRemaining = this.mines = Grid.nMines;
        this.nRows = Grid.nRows;
        console.log(`init params: ${params}`);
    }

    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload(): void {
    // TODO
    }

    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create(): void {
        // TODO
        const graphics = this.add.graphics({ fillStyle: { color: 0x0000ff }, lineStyle: { color: 0x0000aa } });


        let rectangles = [];

        for (let x = 0; x < this.nRows; x++) {
            rectangles[x] = [];
            for (let y = 0; y < this.nRows; y++) {
                rectangles[x][y] = new Phaser.Geom.Rectangle(x * 80, y * 60, 80, 60);
            }
        };

        console.log(rectangles);

        this.input.on('pointerdown', function (pointer) {
            var x = Math.floor(pointer.x / 80);
            var y = Math.floor(pointer.y / 60);

            rectangles[x][y].setEmpty();

            redraw();
        });

        const redraw = () => {
            graphics.clear();

            for(var x = 0; x < 10; x++)
            {
                for(var y = 0; y < 10; y++)
                {
                    graphics.fillRectShape(rectangles[x][y]);
                    graphics.strokeRectShape(rectangles[x][y]);
                }
            }
        }

        redraw();


    }

    /**
     * Called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param [time]
     */
    update(): void {
        // TODO
    }

}