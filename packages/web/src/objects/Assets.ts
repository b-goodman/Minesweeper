import { Scene, Sound } from "phaser";
import { UncoveredTextures, Textures, SoundKeys } from "./enums";

// interface SoundMapEntry {
//     sound?: Sound.BaseSound,
//     key: string,
//     path: string
// }

export class Assets {

    private static _scene: Scene;

    // private static _sound_data = new Map<SoundKeys, Object>([ [SoundKeys.FLAGGED_1, {path:"", key:""}], ])

    static Sounds: Map<SoundKeys, Sound.BaseSound > = new Map([]);

    static UncoveredTextures: Map<number, string> = new Map(new Array(8+1).fill(undefined).map( (_e, i) => {
        return `n${i.toString(10).padStart(2,"0")}`}).entries()
    )

    constructor(scene: Scene){
        Assets._scene = scene;
        scene.load.image(Textures.COVERED, "/assets/images/09.png");
        scene.load.image(UncoveredTextures.EMPTY, "/assets/images/10.png");
        scene.load.image(Textures.FLAGGED, "/assets/images/11.png");
        scene.load.image(Textures.HOVER, "/assets/images/12.png");
        scene.load.image(Textures.ADJACENT, "/assets/images/13.png");
        scene.load.image(Textures.MINED, "/assets/images/14.png");

        scene.load.image(UncoveredTextures.N01, "/assets/images/01.png");
        scene.load.image(UncoveredTextures.N02, "/assets/images/02.png");
        scene.load.image(UncoveredTextures.N03, "/assets/images/03.png");
        scene.load.image(UncoveredTextures.N04, "/assets/images/04.png");
        scene.load.image(UncoveredTextures.N05, "/assets/images/05.png");
        scene.load.image(UncoveredTextures.N06, "/assets/images/06.png");
        scene.load.image(UncoveredTextures.N07, "/assets/images/07.png");
        scene.load.image(UncoveredTextures.N08, "/assets/images/08.png");

        scene.load.audio(SoundKeys.UNCOVERED_1, "/assets/audio/uncover_1.mp3");
        scene.load.audio(SoundKeys.UNCOVERED_2, "/assets/audio/uncover_2.mp3");
        scene.load.audio(SoundKeys.UNCOVERED_LONG_1, "/assets/audio/uncover_long_1.mp3");
        scene.load.audio(SoundKeys.MINE_UNCOVER_1, "/assets/audio/mine_uncover_1.mp3");
        scene.load.audio(SoundKeys.FLAGGED_1, "/assets/audio/flagged_1.mp3");
        scene.load.audio(SoundKeys.FLAGGED_2, "/assets/audio/flagged_2.mp3");
        scene.load.audio(SoundKeys.FLAGGED_3, "/assets/audio/flagged_3.mp3");
        scene.load.audio(SoundKeys.UNFLAG_1, "/assets/audio/unflag_1.mp3");
        scene.load.audio(SoundKeys.UNFLAG_2, "/assets/audio/unflag_2.mp3");

    }

    static addSounds():void {
        // const s1 = Assets._scene.sound.add(SoundKeys.UNCOVERED_1);
        // Assets.Sounds.set( SoundKeys.UNCOVERED_1, Assets._scene.sound.add(SoundKeys.UNCOVERED_1)  );

        Assets.Sounds.set( SoundKeys.UNCOVERED_1, this._scene.sound.add(SoundKeys.UNCOVERED_1)  );
        Assets.Sounds.set( SoundKeys.UNCOVERED_2, this._scene.sound.add(SoundKeys.UNCOVERED_2)  );
        Assets.Sounds.set( SoundKeys.UNCOVERED_LONG_1, this._scene.sound.add(SoundKeys.UNCOVERED_LONG_1)  );
        Assets.Sounds.set( SoundKeys.MINE_UNCOVER_1, this._scene.sound.add(SoundKeys.MINE_UNCOVER_1)  );
        Assets.Sounds.set( SoundKeys.FLAGGED_1, this._scene.sound.add(SoundKeys.FLAGGED_1)  );
        Assets.Sounds.set( SoundKeys.FLAGGED_2, this._scene.sound.add(SoundKeys.FLAGGED_2)  );
        Assets.Sounds.set( SoundKeys.FLAGGED_3, this._scene.sound.add(SoundKeys.FLAGGED_3)  );
        Assets.Sounds.set( SoundKeys.UNFLAG_1, this._scene.sound.add(SoundKeys.UNFLAG_1)  );
        Assets.Sounds.set( SoundKeys.UNFLAG_2, this._scene.sound.add(SoundKeys.UNFLAG_2)  );

        console.log(Assets.Sounds);

    }



}