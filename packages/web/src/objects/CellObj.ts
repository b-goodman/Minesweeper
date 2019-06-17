import { EmitterEvents, Textures, GameEvents } from './enums';
import { GameObjects, Input, Scene } from "phaser";
// import { Assets } from './Assets';
import { Coord, Cell, CellEvents } from '@minesweeper/core';


const isArrayEqual = <T>( arr1:Array<T>, arr2:Array<T> ) => {
    return arr1.every( (e:T, i:number) => {
        return e === arr2[i]
    })
};


export default class CellObj extends GameObjects.Sprite {
    static  ADJACENCY_COORDS: Coord[] = [];
    cellData: Cell;
    isHover: boolean = false;
    // parentScene: Scene;



    constructor(scene: Scene, pos:{x:number,y:number}, data:{cellObj:Cell}){
        super(scene, pos.x, pos.y, "Tiles", Textures.COVERED);
        this.setInteractive();
        this.on( EmitterEvents.CLICKED, this.clickEventHandler);
        this.on( EmitterEvents.DOUBLE_CLICKED, this.doubleClickEventHandler);
        this.on( EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on( EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);
        this.cellData = data.cellObj;
        this.cellData.addEventListner( CellEvents.FLAGGED, () => {
            scene.events.emit( GameEvents.CELL_FLAGGED)
        });
        this.cellData.addEventListner( CellEvents.UNCOVERED, () => {
            scene.events.emit( GameEvents.CELL_UNCOVERED)
        });
        this.cellData.addEventListner( CellEvents.UNFLAGGED, () => {
            scene.events.emit( GameEvents.CELL_UNFLAGGED)
        });
        this.cellData.addEventListner( CellEvents.MINE_UNCOVERED, () => {
            scene.events.emit( GameEvents.MINE_REVEALED)
        })
        // this.parentScene = scene;
    }

    refreshState ():void {
        if ( this.isAdajcentToHovered() ){
            this.setTexture("Tiles", Textures.ADJACENT);
        } else if ( this.isHover && !this.cellData.flagged ){
            this.setTexture("Tiles", Textures.HOVER);
        }else if ( !this.cellData.covered ) {
            if (this.cellData.mined){
                this.setTexture("Tiles", Textures.MINED);
            } else {
                this.setTexture("Tiles", this.cellData.adjacentMines.toString() );
            }
        } else if ( this.cellData.flagged ) {
            this.setTexture("Tiles", Textures.FLAGGED);
        } else {
            this.setTexture("Tiles", Textures.COVERED);
        }
    }


    clickEventHandler ( _pointer:Input.Pointer, whichBtn: EmitterEvents.POINTER_RIGHT | EmitterEvents.POINTER_LEFT ):void {
        this.isHover = false;
        switch (whichBtn) {
            case EmitterEvents.POINTER_LEFT:
                    this.cellData.uncover();
                break;
            case EmitterEvents.POINTER_RIGHT:
                    this.cellData.toggleFlag();
                break;
            default:
                break;
        }
    }

    doubleClickEventHandler ( _pointer:Input.Pointer, whichBtn: EmitterEvents.POINTER_RIGHT | EmitterEvents.POINTER_LEFT ):void {
        // uncover unflagged adjacent cells, as indicated on hover
        switch (whichBtn) {
            case EmitterEvents.POINTER_LEFT:
                    CellObj.ADJACENCY_COORDS = [];
                    this.cellData.getAdjacentCoveredCells().map( cell => cell.uncover() );
                break;
            default:
                break;
        }
    }


    hoverInEventHandler ():void {
        if ( !this.cellData.covered ){
            const highlightAdjCells = this.cellData.getAdjacentCoveredCells().map( cell => cell.coordinate );
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
        } else {
            this.isHover = true;
            CellObj.ADJACENCY_COORDS = [];
        }
    }


    hoverOutEventHandler ():void {
        if ( this.cellData.covered ){
            this.isHover = false;
        }
    }


    isAdajcentToHovered ():boolean {
        return CellObj.ADJACENCY_COORDS.some( e => {
            return isArrayEqual(e, this.cellData.coordinate )
        });
    }


}

