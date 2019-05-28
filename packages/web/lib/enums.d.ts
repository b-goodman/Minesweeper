export declare enum InputEventType {
    GAMEOBJECT_OUT = "gameobjectout",
    GAMEOBJECT_DOWN = "gameobjectdown",
    GAMEOBJECT_OVER = "gameobjectover",
    CHANGE_DATA = "changedata"
}
export declare enum EmitterEvents {
    CLICKED = "clicked",
    DOUBLE_CLICKED = "doubleClicked",
    HOVER_IN = "hoverIn",
    HOVER_OUT = "hoverOut",
    ADJACENCY_ON = "adjacencyOn",
    ADJACENCY_OFF = "adjacencyOff",
    REFRESH_STATE = "updateState",
    POINTER_LEFT = "pointer_left",
    POINTER_RIGHT = "pointer_right"
}
export declare enum Textures {
    COVERED = "cover",
    FLAGGED = "flagged",
    HOVER = "hover",
    ADJACENT = "adjacent",
    MINED = "mined"
}
export declare enum UncoveredTextures {
    EMPTY = "n00",
    N01 = "n01",
    N02 = "n02",
    N03 = "n03",
    N04 = "n04",
    N05 = "n05",
    N06 = "n06",
    N07 = "n07",
    N08 = "n08"
}
export declare class UncoveredTexturesMap {
    private static textures;
    static lookup(index: number): string;
}
//# sourceMappingURL=enums.d.ts.map