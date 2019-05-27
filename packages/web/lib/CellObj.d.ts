import { GameObjects, Input, Scene } from "phaser";
import { Coord } from '@minesweeper/core/lib/interfaces';
export default class CellObj extends GameObjects.Sprite {
    static ADJACENCY_COORDS: Coord[];
    cellIndex: Coord;
    isHover: boolean;
    constructor(scene: Scene, pos: {
        x: number;
        y: number;
    }, params: {
        index: Coord;
    });
    refreshState(): void;
    clickEventHandler(pointer: Input.Pointer): void;
    doubleClickEventHandler(pointer: Input.Pointer): void;
    hoverInEventHandler(): void;
    hoverOutEventHandler(): void;
    isAdajcentToHovered(): boolean;
}
//# sourceMappingURL=CellObj.d.ts.map