"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
// interface SoundMapEntry {
//     sound?: Sound.BaseSound,
//     key: string,
//     path: string
// }
class Assets {
    constructor(scene) {
        Assets._scene = scene;
        scene.load.image(enums_1.Textures.COVERED, "/assets/images/09.png");
        scene.load.image(enums_1.UncoveredTextures.EMPTY, "/assets/images/10.png");
        scene.load.image(enums_1.Textures.FLAGGED, "/assets/images/11.png");
        scene.load.image(enums_1.Textures.HOVER, "/assets/images/12.png");
        scene.load.image(enums_1.Textures.ADJACENT, "/assets/images/13.png");
        scene.load.image(enums_1.Textures.MINED, "/assets/images/14.png");
        scene.load.image(enums_1.UncoveredTextures.N01, "/assets/images/01.png");
        scene.load.image(enums_1.UncoveredTextures.N02, "/assets/images/02.png");
        scene.load.image(enums_1.UncoveredTextures.N03, "/assets/images/03.png");
        scene.load.image(enums_1.UncoveredTextures.N04, "/assets/images/04.png");
        scene.load.image(enums_1.UncoveredTextures.N05, "/assets/images/05.png");
        scene.load.image(enums_1.UncoveredTextures.N06, "/assets/images/06.png");
        scene.load.image(enums_1.UncoveredTextures.N07, "/assets/images/07.png");
        scene.load.image(enums_1.UncoveredTextures.N08, "/assets/images/08.png");
        scene.load.audio(enums_1.SoundKeys.UNCOVERED_1, "/assets/audio/uncover_1.mp3");
        scene.load.audio(enums_1.SoundKeys.UNCOVERED_2, "/assets/audio/uncover_2.mp3");
        scene.load.audio(enums_1.SoundKeys.UNCOVERED_LONG_1, "/assets/audio/uncover_long_1.mp3");
        scene.load.audio(enums_1.SoundKeys.MINE_UNCOVER_1, "/assets/audio/mine_uncover_1.mp3");
        scene.load.audio(enums_1.SoundKeys.FLAGGED_1, "/assets/audio/flagged_1.mp3");
        scene.load.audio(enums_1.SoundKeys.FLAGGED_2, "/assets/audio/flagged_2.mp3");
        scene.load.audio(enums_1.SoundKeys.FLAGGED_3, "/assets/audio/flagged_3.mp3");
        scene.load.audio(enums_1.SoundKeys.UNFLAG_1, "/assets/audio/unflag_1.mp3");
        scene.load.audio(enums_1.SoundKeys.UNFLAG_2, "/assets/audio/unflag_2.mp3");
    }
    static addSounds() {
        // const s1 = Assets._scene.sound.add(SoundKeys.UNCOVERED_1);
        // Assets.Sounds.set( SoundKeys.UNCOVERED_1, Assets._scene.sound.add(SoundKeys.UNCOVERED_1)  );
        Assets.Sounds.set(enums_1.SoundKeys.UNCOVERED_1, this._scene.sound.add(enums_1.SoundKeys.UNCOVERED_1));
        Assets.Sounds.set(enums_1.SoundKeys.UNCOVERED_2, this._scene.sound.add(enums_1.SoundKeys.UNCOVERED_2));
        Assets.Sounds.set(enums_1.SoundKeys.UNCOVERED_LONG_1, this._scene.sound.add(enums_1.SoundKeys.UNCOVERED_LONG_1));
        Assets.Sounds.set(enums_1.SoundKeys.MINE_UNCOVER_1, this._scene.sound.add(enums_1.SoundKeys.MINE_UNCOVER_1));
        Assets.Sounds.set(enums_1.SoundKeys.FLAGGED_1, this._scene.sound.add(enums_1.SoundKeys.FLAGGED_1));
        Assets.Sounds.set(enums_1.SoundKeys.FLAGGED_2, this._scene.sound.add(enums_1.SoundKeys.FLAGGED_2));
        Assets.Sounds.set(enums_1.SoundKeys.FLAGGED_3, this._scene.sound.add(enums_1.SoundKeys.FLAGGED_3));
        Assets.Sounds.set(enums_1.SoundKeys.UNFLAG_1, this._scene.sound.add(enums_1.SoundKeys.UNFLAG_1));
        Assets.Sounds.set(enums_1.SoundKeys.UNFLAG_2, this._scene.sound.add(enums_1.SoundKeys.UNFLAG_2));
        console.log(Assets.Sounds);
    }
}
// private static _sound_data = new Map<SoundKeys, Object>([ [SoundKeys.FLAGGED_1, {path:"", key:""}], ])
Assets.Sounds = new Map([]);
Assets.UncoveredTextures = new Map(new Array(8 + 1).fill(undefined).map((_e, i) => {
    return `n${i.toString(10).padStart(2, "0")}`;
}).entries());
exports.Assets = Assets;
//# sourceMappingURL=Assets.js.map