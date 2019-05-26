//Geom, Loader,
import { GameObjects,  Input, Scene } from "phaser";
import CellObj from "./CellObj";
import {Grid} from "@minesweeper/core/lib";
import { Textures } from "./enums";

//Color,
import {  EmitterEvents, InputEventType } from "./enums";
// import { Coord } from "@minesweeper/core/lib/interfaces"

const config = {
    key: "GridScene",
}

interface InitParams {
    rows: number,
    cellWidth: number,
}

const defaultParams: InitParams = {
    rows:10,
    cellWidth: 60,
}



export default class GridScene extends Scene {
    mines: number;
    flagsRemaining: number;
    params: InitParams;
    cellObjs: CellObj[] = [];

    constructor(){
        super(config);
    }

    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params:InitParams = defaultParams): void {
        new Grid( params.rows, {} );
        this.flagsRemaining = this.mines = Grid.nMines;
        this.params = params;
        console.log(`init params: ${JSON.stringify(params)}`);
    }

    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload(): void {

        // this.load.atlas("tiles","assets/tileset.png","assets/minesweeper_tileset.json");
        this.load.image(Textures.COVERED, "/assets/09.png");
        this.load.image(Textures.EMPTY, "/assets/10.png");
        this.load.image(Textures.FLAGGED, "/assets/11.png");
        this.load.image(Textures.HOVER, "/assets/12.png");
        this.load.image(Textures.ADJACENT, "/assets/13.png");
        this.load.image(Textures.MINED, "/assets/14.png");
    }

    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create(): void {

        this.cellObjs = new Array(Grid.nRows).fill(undefined).map( ( _elem, index_i) => {
            return new Array(Grid.nRows).fill(undefined).map( ( _elem, index_j ) => {
                const p0 = {x: (index_j * this.params.cellWidth) + this.params.cellWidth/2  , y: (index_i * this.params.cellWidth) + this.params.cellWidth/2};
                return this.add.existing( new CellObj(this, p0, {index: [index_i,index_j] }) ) as CellObj;
            })
        }).flat();

        // initialize event emitters.
        this.input.mouse.disableContextMenu();

        this.input.on( InputEventType.GAMEOBJECT_DOWN, ( _pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            gameObject.emit( EmitterEvents.CLICKED, _pointer );
        })

        this.input.on( InputEventType.GAMEOBJECT_OVER, ( _pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            gameObject.emit( EmitterEvents.HOVER_IN , _pointer );
        })

        this.input.on( InputEventType.GAMEOBJECT_OUT, ( _pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            gameObject.emit( EmitterEvents.HOVER_OUT, _pointer );
        })

    }

    /**
     * Called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param [time]
     */
    update(): void {
        // TODO
        this.cellObjs.forEach( obj => obj.refreshState() )
    }

}