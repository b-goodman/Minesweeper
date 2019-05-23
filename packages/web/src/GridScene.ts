import Phaser from "phaser";
import {Grid, CellStates} from "@minesweeper/core/lib"

const config = {
    key: "GridScene",
}

interface initParams {
    rows: number,
    cellWidth: number,
}

const defaultParams: initParams = {
    rows:10,
    cellWidth: 60,
}

const createCellGeom = (params:initParams): Array< Phaser.Geom.Rectangle[] > => {
    let geomArray = [];
    for (let x = 0; x < params.rows; x++) {
        geomArray[x] = [];
        for (let y = 0; y < params.rows; y++) {
            geomArray[x][y] = new Phaser.Geom.Rectangle(x * params.cellWidth, y * params.cellWidth, params.cellWidth, params.cellWidth);
        }
    };
    return geomArray;
};


const cellGraphicsStyle = (cellState:CellStates = CellStates.covered) => {

    const defaultCovered = {
        fillStyle: {
            color: 0xC0C0C0
        },
        lineStyle: {
            color: 0x0000aa
        }
    };

    switch (cellState) {
        case CellStates.covered:
            return defaultCovered;
            break;

        case CellStates.uncovered:
            return {
                fillStyle: {
                    color: 0x0000ff
                },
                lineStyle: {
                    color: 0x0000aa
                }
            }
            break;

        case CellStates.flagged:
            return {
                fillStyle: {
                    color: 0x008000,
                },
                lineStyle: {
                    color: 0x0000aa
                }
            }
            break;

        default:
            return defaultCovered;
            break;
    }

};



export default class GridScene extends Phaser.Scene {
    mines: number;
    flagsRemaining: number;
    cellGeom: Array< Phaser.Geom.Rectangle[] > = [[]];
    params: initParams;

    constructor(){
        super(config);
    }

    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params:initParams = defaultParams): void {
        new Grid( params.rows, {} );
        this.flagsRemaining = this.mines = Grid.nMines;
        this.cellGeom = createCellGeom(params);
        this.params = params;
        console.log(`init params: ${JSON.stringify(params)}`);
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
        const graphics = this.add.graphics(cellGraphicsStyle());

        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', (pointer) => {
            const x = Math.floor(pointer.x / this.params.cellWidth);
            const y = Math.floor(pointer.y / this.params.cellWidth);
            if ( pointer.rightButtonDown() ){
                //toggle flag on clicked cell
                Grid.Cells[x][y].toggleFlag();
            } else {
                //uncover cell
                Grid.Cells[x][y].uncover();
            };
            const cellState:CellStates = Grid.getCell([x,y]).state;
            console.log(cellState);
            redraw();
        });

        const redraw = () => {
            graphics.clear();

            for(let x = 0; x < this.params.rows; x++)
            {
                for(let y = 0; y < this.params.rows; y++)
                {
                    const cellState:CellStates = Grid.getCell([x,y]).state;
                    graphics.fillStyle(cellGraphicsStyle(cellState).fillStyle.color)
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
    update(): void {
        // TODO
    }

}