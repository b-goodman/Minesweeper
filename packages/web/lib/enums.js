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
    EmitterEvents["HOVER_IN"] = "hoverIn";
    EmitterEvents["HOVER_OUT"] = "hoverOut";
    EmitterEvents["ADJACENCY_ON"] = "adjacencyOn";
    EmitterEvents["ADJACENCY_OFF"] = "adjacencyOff";
    EmitterEvents["REFRESH_STATE"] = "updateState";
})(EmitterEvents = exports.EmitterEvents || (exports.EmitterEvents = {}));
var Textures;
(function (Textures) {
    Textures["COVERED"] = "cover";
    Textures["FLAGGED"] = "flagged";
    Textures["HOVER"] = "hover";
    Textures["ADJACENT"] = "adjacent";
    Textures["EMPTY"] = "empty";
    Textures["MINED"] = "mined";
})(Textures = exports.Textures || (exports.Textures = {}));
