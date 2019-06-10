"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputEventType;
(function (InputEventType) {
    InputEventType["GAMEOBJECT_OUT"] = "gameobjectout";
    InputEventType["GAMEOBJECT_DOWN"] = "gameobjectdown";
    InputEventType["GAMEOBJECT_OVER"] = "gameobjectover";
    InputEventType["CHANGE_DATA"] = "changedata";
})(InputEventType = exports.InputEventType || (exports.InputEventType = {}));
var EmitterEvents;
(function (EmitterEvents) {
    EmitterEvents["CLICKED"] = "clicked";
    EmitterEvents["DOUBLE_CLICKED"] = "doubleClicked";
    EmitterEvents["HOVER_IN"] = "hoverIn";
    EmitterEvents["HOVER_OUT"] = "hoverOut";
    EmitterEvents["ADJACENCY_ON"] = "adjacencyOn";
    EmitterEvents["ADJACENCY_OFF"] = "adjacencyOff";
    EmitterEvents["REFRESH_STATE"] = "updateState";
    EmitterEvents["POINTER_LEFT"] = "pointer_left";
    EmitterEvents["POINTER_RIGHT"] = "pointer_right";
    EmitterEvents["MINE_UNCOVERED"] = "mine_uncovered";
})(EmitterEvents = exports.EmitterEvents || (exports.EmitterEvents = {}));
var Textures;
(function (Textures) {
    Textures["COVERED"] = "cover";
    Textures["FLAGGED"] = "flagged";
    Textures["HOVER"] = "hover";
    Textures["ADJACENT"] = "adjacent";
    Textures["MINED"] = "mined";
})(Textures = exports.Textures || (exports.Textures = {}));
var UncoveredTextures;
(function (UncoveredTextures) {
    UncoveredTextures["EMPTY"] = "n00";
    UncoveredTextures["N01"] = "n01";
    UncoveredTextures["N02"] = "n02";
    UncoveredTextures["N03"] = "n03";
    UncoveredTextures["N04"] = "n04";
    UncoveredTextures["N05"] = "n05";
    UncoveredTextures["N06"] = "n06";
    UncoveredTextures["N07"] = "n07";
    UncoveredTextures["N08"] = "n08";
})(UncoveredTextures = exports.UncoveredTextures || (exports.UncoveredTextures = {}));
var SoundKeys;
(function (SoundKeys) {
    SoundKeys["UNCOVERED_1"] = "UNCOVERED_1";
    SoundKeys["UNCOVERED_2"] = "UNCOVERED_2";
    SoundKeys["UNCOVERED_LONG_1"] = "UNCOVERED_LONG_1";
    SoundKeys["MINE_UNCOVER_1"] = "MINE_UNCOVER_1";
    SoundKeys["FLAGGED_1"] = "FLAGGED_1";
    SoundKeys["FLAGGED_2"] = "FLAGGED_2";
    SoundKeys["FLAGGED_3"] = "FLAGGED_3";
    SoundKeys["UNFLAG_1"] = "UNFLAG_1";
    SoundKeys["UNFLAG_2"] = "UNFLAG_2";
})(SoundKeys = exports.SoundKeys || (exports.SoundKeys = {}));
//# sourceMappingURL=enums.js.map