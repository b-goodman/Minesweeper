import { EmitterEvents, Textures } from './enums';
import { GameObjects, Input, Scene } from "phaser";
import {Grid, CellStates} from "@minesweeper/core/lib";
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
        this.on( EmitterEvents.HOVER_IN, this.hoverInEventHandler);
        this.on( EmitterEvents.HOVER_OUT, this.hoverOutEventHandler);

        this.cellIndex = params.index;
    }

    clickEventHandler (pointer:Input.Pointer):void {
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
    }


    refreshState ():void {
        console.log(`[${this.cellIndex}] refreshing state`)
        const cellData = Grid.getCell(this.cellIndex);

        if ( this.isAdajcentToHovered() ){
            this.setTexture(Textures.ADJACENT);
        } else if ( this.isHover ){
            this.setTexture(Textures.HOVER);
        }else{

            switch(cellData.state) {

                case CellStates.UNCOVERED:
                    this.setTexture(cellData.isMined ? Textures.MINED : Textures.EMPTY);
                    break;

                case CellStates.COVERED:
                    this.setTexture(cellData.flagged ? Textures.FLAGGED : Textures.COVERED);
                    break;

                default:
                    break;
            }

        }
    }

    hoverInEventHandler ():void {
        const cellData = Grid.getCell(this.cellIndex);
        if ( cellData.isCovered ){
            this.isHover = true;
            const highlightAdjCells = cellData.getAdjacentCoveredCells().map( cell => cell.coordinate );
            CellObj.ADJACENCY_COORDS = highlightAdjCells;
        } else {
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

