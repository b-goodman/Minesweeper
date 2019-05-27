import { EmitterEvents, Textures, UncoveredTexturesMap } from './enums';
import { GameObjects, Input, Scene } from "phaser";
import {Grid} from "@minesweeper/core/lib";
import { Coord } from '@minesweeper/core/lib/interfaces';


const isArrayEqual = <T>( arr1:Array<T>, arr2:Array<T> ) => {
    return arr1.every( (e:T, i:number) => {
        return e === arr2[i]
    })
};

export default class CellObj extends GameObjects.Sprite {
    static  ADJACENCY_COORDS: Coord[] = [];
    cellIndex: Coord;
    isHover: boolean = false;

    constructor(scene: Scene, pos:{x:number,y:number}, params:{index:Coord}){
        super(scene, pos.x, pos.y, Textures.COVERED);
        this.setInteractive();
        this.on( EmitterEvents.CLICKED, this.clickEventHandler);
        this.on( EmitterEvents.DOUBLE_CLICKED, this.doubleClickEventHandler);
        this.on( EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on( EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);

        // TODO - change to this.cell = Grid.getCell(index)
        this.cellIndex = params.index;
    }

    refreshState ():void {

        const cellData = Grid.getCell(this.cellIndex);

        if ( this.isAdajcentToHovered() ){
            this.setTexture(Textures.ADJACENT);
        } else if ( this.isHover && !cellData.isFlagged ){
            this.setTexture(Textures.HOVER);
        }else if ( !cellData.isCovered ) {
            this.setTexture(cellData.isMined ? Textures.MINED : UncoveredTexturesMap.lookup(cellData.adjacentMines) );
        } else if ( cellData.isFlagged ) {
            this.setTexture(Textures.FLAGGED);
        } else {
            this.setTexture(Textures.COVERED);
        }
    }


    clickEventHandler (pointer:Input.Pointer):void {
        this.isHover = false;

        switch (pointer.buttons) {
            case 1:
                Grid.getCell(this.cellIndex).uncover();
                break;
            case 2:
                Grid.getCell(this.cellIndex).toggleFlag();
                break;
            default:
                break;
        }
        console.log(Grid.getCell(this.cellIndex))
    }

    doubleClickEventHandler (pointer:Input.Pointer):void {
        pointer.buttons === 1 ? console.log("L double click detected") : console.log("other double click detected")
    }

    hoverInEventHandler ():void {
        const cellData = Grid.getCell(this.cellIndex);
        if ( !cellData.isCovered ){
            const highlightAdjCells = cellData.getAdjacentCoveredCells().map( cell => cell.coordinate );
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
        } else {
            this.isHover = true;
            CellObj.ADJACENCY_COORDS = [];
        }
    }

    hoverOutEventHandler ():void {
        if ( Grid.getCell(this.cellIndex).isCovered ){
            this.isHover = false;
        }
    }

    isAdajcentToHovered ():boolean {
        return CellObj.ADJACENCY_COORDS.some( e => {return isArrayEqual(e, this.cellIndex )});
    }


}

