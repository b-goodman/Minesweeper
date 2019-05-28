//Geom, Loader,
import { GameObjects,  Input, Scene } from "phaser";
import CellObj from "./CellObj";
import {Grid} from "@minesweeper/core/lib";
import { Textures, UncoveredTextures } from "./enums";

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
    rows:15,
    cellWidth: 60,
}


export default class GridScene extends Scene {
    mines: number;
    flagsRemaining: number;
    params: InitParams;
    cellObjs: CellObj[] = [];
    lClicks: number = 0;
    doubleClickDelay: number = 170;

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
        this.load.image(UncoveredTextures.EMPTY, "/assets/10.png");
        this.load.image(Textures.FLAGGED, "/assets/11.png");
        this.load.image(Textures.HOVER, "/assets/12.png");
        this.load.image(Textures.ADJACENT, "/assets/13.png");
        this.load.image(Textures.MINED, "/assets/14.png");

        this.load.image(UncoveredTextures.N01, "/assets/01.png");
        this.load.image(UncoveredTextures.N02, "/assets/02.png");
        this.load.image(UncoveredTextures.N03, "/assets/03.png");
        this.load.image(UncoveredTextures.N04, "/assets/04.png");
        this.load.image(UncoveredTextures.N05, "/assets/05.png");
        this.load.image(UncoveredTextures.N06, "/assets/06.png");
        this.load.image(UncoveredTextures.N07, "/assets/07.png");
        this.load.image(UncoveredTextures.N08, "/assets/08.png");

    }

    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create(): void {

        this.cellObjs = new Array(Grid.nRows).fill(undefined).map( ( _elem, index_i) => {
            return new Array(Grid.nRows).fill(undefined).map( ( _elem, index_j ) => {
                const p0 = {x: (index_j * this.params.cellWidth) + this.params.cellWidth/2  , y: (index_i * this.params.cellWidth) + this.params.cellWidth/2};
                return this.add.existing( new CellObj(this, p0, {cellObj: Grid.getCell([index_i,index_j]) }) ) as CellObj;
            })
        }).flat();

        // initialize event emitters.
        this.input.mouse.disableContextMenu();

        const handleClickInput = ( pointer:Input.Pointer, gameObject:GameObjects.Sprite, whichBtn: EmitterEvents.POINTER_RIGHT | EmitterEvents.POINTER_LEFT ) => {
            if(this.lClicks == 1) {
                gameObject.emit( EmitterEvents.CLICKED, pointer, whichBtn );
            } else {
                gameObject.emit( EmitterEvents.DOUBLE_CLICKED, pointer, whichBtn );
            }
            this.lClicks = 0;
        };

        this.input.on( InputEventType.GAMEOBJECT_DOWN, ( pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            const whichBtn = pointer.rightButtonDown() ? EmitterEvents.POINTER_RIGHT : EmitterEvents.POINTER_LEFT;
            this.lClicks++;
            this.time.delayedCall(this.doubleClickDelay, handleClickInput, [pointer, gameObject, whichBtn], this);
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