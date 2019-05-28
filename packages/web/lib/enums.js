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
class UncoveredTexturesMap {
    static lookup(index) {
        return UncoveredTexturesMap.textures.get(index);
    }
}
UncoveredTexturesMap.textures = new Map(new Array(8 + 1).fill(undefined).map((_e, i) => {
    return `n${i.toString(10).padStart(2, "0")}`;
}).entries());
exports.UncoveredTexturesMap = UncoveredTexturesMap;
