import { EmitterEvents, Textures, UncoveredTexturesMap } from './enums';
import { GameObjects, Input, Scene } from "phaser";
import { Cell } from "@minesweeper/core/lib";
import { Coord } from '@minesweeper/core/lib/interfaces';


const isArrayEqual = <T>( arr1:Array<T>, arr2:Array<T> ) => {
    return arr1.every( (e:T, i:number) => {
        return e === arr2[i]
    })
};


export default class CellObj extends GameObjects.Sprite {
    static  ADJACENCY_COORDS: Coord[] = [];
    cellData: Cell;
    isHover: boolean = false;

    constructor(scene: Scene, pos:{x:number,y:number}, data:{cellObj:Cell}){
        super(scene, pos.x, pos.y, Textures.COVERED);
        this.setInteractive();
        this.on( EmitterEvents.CLICKED, this.clickEventHandler);
        this.on( EmitterEvents.DOUBLE_CLICKED, this.doubleClickEventHandler);
        this.on( EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on( EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);

        this.cellData = data.cellObj
    }


    refreshState ():void {
        if ( this.isAdajcentToHovered() ){
            this.setTexture(Textures.ADJACENT);
        } else if ( this.isHover && !this.cellData.isFlagged ){
            this.setTexture(Textures.HOVER);
        }else if ( !this.cellData.isCovered ) {
            this.setTexture(this.cellData.isMined ? Textures.MINED : UncoveredTexturesMap.lookup(this.cellData.adjacentMines) );
        } else if ( this.cellData.isFlagged ) {
            this.setTexture(Textures.FLAGGED);
        } else {
            this.setTexture(Textures.COVERED);
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
        console.log(this.cellData)
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
        if ( !this.cellData.isCovered ){
            const highlightAdjCells = this.cellData.getAdjacentCoveredCells().map( cell => cell.coordinate );
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
        } else {
            this.isHover = true;
            CellObj.ADJACENCY_COORDS = [];
        }
    }


    hoverOutEventHandler ():void {
        if ( this.cellData.isCovered ){
            this.isHover = false;
        }
    }


    isAdajcentToHovered ():boolean {
        return CellObj.ADJACENCY_COORDS.some( e => {
            return isArrayEqual(e, this.cellData.coordinate )
        });
    }


}

