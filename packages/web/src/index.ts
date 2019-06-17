import {Game, Scale} from "phaser";
import GridScene from "./scenes/GridScene";

export const enum SceneKeys {
    GRID_SCENE = "GridScene",
    TOOLBAR = "Toolbar"
}

const gameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 660,
    parent: "main",
    scene: [GridScene],
    scale:{
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
    },
    audio: {
        disableWebAudio: true
    },
    backgroundColor: "#FFFFFF",
};

class MinesweeperGame extends Game {
    constructor(config){
        super(config)
    }
}

export interface InitParams { rows?: number, cellWidth?: number,};

const gridSceneParams: InitParams = {
    rows:10,
    cellWidth: 60,
}


window.onload = () => {
    const msGame = new MinesweeperGame(gameConfig);
    msGame.scene.start(SceneKeys.GRID_SCENE, gridSceneParams );
}
