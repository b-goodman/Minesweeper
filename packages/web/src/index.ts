import * as Phaser from "phaser";
import GridScene from "./GridScene";

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: "main",
    scene: [GridScene],
};

export class MinesweeperGame extends Phaser.Game {
    constructor(config){
        super(config)
    }

}

window.onload = () => {
    const msGame = new MinesweeperGame(config);
    msGame.scene.start("GridScene",{rows:10});
}
