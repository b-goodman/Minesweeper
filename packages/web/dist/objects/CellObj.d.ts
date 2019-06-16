import { EmitterEvents } from './enums';
import { GameObjects, Input, Scene } from "phaser";
import { Coord, Cell } from '@minesweeper/core';
export default class CellObj extends GameObjects.Sprite {
    static ADJACENCY_COORDS: Coord[];
    cellData: Cell;
    isHover: boolean;
    constructor(scene: Scene, pos: {
        x: number;
        y: number;
    }, data: {
        cellObj: Cell;
    });
    refreshState(): void;
    clickEventHandler(_pointer: Input.Pointer, whichBtn: EmitterEvents.POINTER_RIGHT | EmitterEvents.POINTER_LEFT): void;
    doubleClickEventHandler(_pointer: Input.Pointer, whichBtn: EmitterEvents.POINTER_RIGHT | EmitterEvents.POINTER_LEFT): void;
    hoverInEventHandler(): void;
    hoverOutEventHandler(): void;
    isAdajcentToHovered(): boolean;
}
//# sourceMappingURL=CellObj.d.ts.map