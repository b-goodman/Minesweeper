import { Scene, Sound } from "phaser";
import { SoundKeys } from "./enums";

// interface SoundMapEntry {
//     sound?: Sound.BaseSound,
//     key: string,
//     path: string
// }

export class Assets {

    private static _scene: Scene;

    static Sounds: Map<SoundKeys, Sound.BaseSound > = new Map([]);

    constructor(scene: Scene){
        Assets._scene = scene;

        scene.load.path = "/assets/images/"
        scene.load.atlasXML("Tiles", "tiles.png", "tiles.xml" )

        // scene.load.path = "/assets/fonts/"
        // scene.load.bitmapFont("DigitsOnly", "numbers.png", "numbers.fnt")

        scene.load.path = "/assets/audio/"
        scene.load.audio(SoundKeys.UNCOVERED_1, "uncover_1.mp3");
        scene.load.audio(SoundKeys.UNCOVERED_2, "uncover_2.mp3");
        scene.load.audio(SoundKeys.UNCOVERED_LONG_1, "uncover_long_1.mp3");
        scene.load.audio(SoundKeys.MINE_UNCOVER_1, "mine_uncover_1.mp3");
        scene.load.audio(SoundKeys.FLAGGED_1, "flagged_1.mp3");
        scene.load.audio(SoundKeys.FLAGGED_2, "flagged_2.mp3");
        scene.load.audio(SoundKeys.FLAGGED_3, "flagged_3.mp3");
        scene.load.audio(SoundKeys.UNFLAG_1, "unflag_1.mp3");
        scene.load.audio(SoundKeys.UNFLAG_2, "unflag_2.mp3");

    }

    static addSounds():void {

        Assets.Sounds.set( SoundKeys.UNCOVERED_1, this._scene.sound.add(SoundKeys.UNCOVERED_1)  );
        Assets.Sounds.set( SoundKeys.UNCOVERED_2, this._scene.sound.add(SoundKeys.UNCOVERED_2)  );
        Assets.Sounds.set( SoundKeys.UNCOVERED_LONG_1, this._scene.sound.add(SoundKeys.UNCOVERED_LONG_1)  );
        Assets.Sounds.set( SoundKeys.MINE_UNCOVER_1, this._scene.sound.add(SoundKeys.MINE_UNCOVER_1)  );
        Assets.Sounds.set( SoundKeys.FLAGGED_1, this._scene.sound.add(SoundKeys.FLAGGED_1)  );
        Assets.Sounds.set( SoundKeys.FLAGGED_2, this._scene.sound.add(SoundKeys.FLAGGED_2)  );
        Assets.Sounds.set( SoundKeys.FLAGGED_3, this._scene.sound.add(SoundKeys.FLAGGED_3)  );
        Assets.Sounds.set( SoundKeys.UNFLAG_1, this._scene.sound.add(SoundKeys.UNFLAG_1)  );
        Assets.Sounds.set( SoundKeys.UNFLAG_2, this._scene.sound.add(SoundKeys.UNFLAG_2)  );

    }



}