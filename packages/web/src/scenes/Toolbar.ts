import { GameObjects, Scene, Time } from "phaser";

import { SceneKeys } from ".."
import GridScene from "./GridScene";
import { Textures } from "../objects/enums";


class FlagCounter extends GameObjects.Container {

    private counterStrInit: string = this.scene.scene.get(SceneKeys.GRID_SCENE).data.values.flagsRemaining.toString();
    private iconImg: GameObjects.Image;
    private counterDisplay: GameObjects.Text;

    constructor(scene: Scene, pos:{x: number, y: number} ){
        super(scene, pos.x, pos.y)

        this.iconImg = new GameObjects.Image(scene, pos.x, pos.y, Textures.FLAGGED );

        this.counterDisplay = new GameObjects.Text(scene, pos.x, pos.y, this.counterStrInit, { fontFamily: '"Roboto Condensed"' });

        this.add([this.iconImg, this.counterDisplay]);

        this.scene.scene.get(SceneKeys.GRID_SCENE).data.events.on("changedata-flagsRemaining", (_parent:GridScene, _key:"flagsRemaining", _newValue:number, _previousValue:number) => {
            this.counterDisplay.setText(_newValue.toString());
            console.log(`${_newValue} flags remaining.`)
        })

    }
}

class GameTimer extends GameObjects.Container {

    private clockDisplay: GameObjects.Text;
    public tickEvent: Time.TimerEvent;
    private displayTextInit: string = "-";

    constructor(scene: Scene, pos:{x:number, y:number}){
        super(scene, pos.x, pos.y);
        this.tickEvent = scene.time.addEvent({delay: 1e3, loop: true})
        this.clockDisplay = new GameObjects.Text(scene, pos.x, pos.y, this.displayTextInit, { fontFamily: '"Roboto Condensed"' });
        this.add([this.clockDisplay]);

    }

    redraw(): void {
        this.clockDisplay.setText( this.tickEvent.getOverallProgress.toString() )
    }


}


export default class Toolbar extends Scene {

    private flagCounter: FlagCounter;
    private gameTimer: GameTimer;

    constructor(){
        super({
            key: SceneKeys.TOOLBAR,
        });
    }

    init(): void {

    }


    preload(): void {


    }


    create(): void {

        this.flagCounter = new FlagCounter(this, {x:0, y:0} );
        this.gameTimer = new GameTimer(this, {x: 20, y:0});

        console.log(this.gameTimer.tickEvent)

        this.add.existing(this.flagCounter)
        this.add.existing(this.gameTimer)

    }

    update(): void {
        this.gameTimer.redraw()
    }

}