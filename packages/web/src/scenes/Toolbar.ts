import { GameObjects, Scene, Time } from "phaser";

import { SceneKeys } from ".."
import GridScene from "./GridScene";
import { Textures } from "../objects/enums";

const  textStyle = {
    color: "#333333",
    fontFamily: "Roboto Condensed",
    fontSize: "24px",
}

class FlagCounter extends GameObjects.Container {

    private counterStrInit: string = this.scene.scene.get(SceneKeys.GRID_SCENE).data.values.flagsRemaining.toString();
    private iconImg: GameObjects.Image;
    private counterDisplay: GameObjects.Text;

    constructor(scene: Scene, pos:{x: number, y: number} ){
        super(scene, pos.x, pos.y)
        this.iconImg = new GameObjects.Image(scene, pos.x, pos.y, "Tiles", Textures.FLAGGED );
        this.iconImg.setScale(0.7,0.7);
        this.setSize(60,60);
        this.counterDisplay = new GameObjects.Text(scene, pos.x - 3, pos.y - 3, this.counterStrInit, textStyle);
        this.add([this.iconImg, this.counterDisplay]);
        this.scene.scene.get(SceneKeys.GRID_SCENE).data.events.on("changedata-flagsRemaining", (_parent:GridScene, _key:"flagsRemaining", _newValue:number, _previousValue:number) => {
            this.counterDisplay.setText(_newValue.toString());
        });
    }

}

class GameTimer extends GameObjects.Container {

    private clockDisplay: GameObjects.Text;
    public tickEvent: Time.TimerEvent;
    public currentTimeAbs = 0;
    public currentTimeMMSS: { m: string, s: string} = {m:"00", s:"00"};

    constructor(scene: Toolbar, pos:{x:number, y:number}){
        super(scene, pos.x, pos.y);
        this.tickEvent = scene.time.addEvent({delay: 1e3, loop: true, callback: this.incrementTime, callbackScope: this });
        this.clockDisplay = new GameObjects.Text(scene, pos.x, pos.y, `${this.currentTimeMMSS.m}:${this.currentTimeMMSS.s}`, textStyle);
        this.add([this.clockDisplay]);
    }

    private incrementTime(): void {
        this.currentTimeAbs += 1;
        this.currentTimeMMSS.m = ( Math.floor(this.currentTimeAbs/60) ).toString().padStart(2,"0");
        this.currentTimeMMSS.s = (this.currentTimeAbs % 60).toString().padStart(2,"0");
        this.clockDisplay.setText(`${this.currentTimeMMSS.m}:${this.currentTimeMMSS.s}`);
    }

    public pauseTimer(): void {
        this.tickEvent.paused = true;
    }

    public resumeTimer(): void {
        this.tickEvent.paused = true;
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

    create(): void {
        this.flagCounter = new FlagCounter(this, {x:30, y:15} );
        this.gameTimer = new GameTimer(this, {x: 50, y:8});
        this.add.existing(this.flagCounter);
        this.add.existing(this.gameTimer);

        this.scene.get(SceneKeys.GRID_SCENE).data.events.on("changedata-isGameOver", (_parent:GridScene, _key:"isGameOver", _newValue:number, _previousValue:number) => {
            if (!_newValue){
                this.gameTimer.pauseTimer();
            }
        });

    }


}