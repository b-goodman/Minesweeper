
export enum InputEventType {
    GAMEOBJECT_OUT = "gameobjectout",
    GAMEOBJECT_DOWN = "gameobjectdown",
    GAMEOBJECT_OVER = "gameobjectover",
    CHANGE_DATA = "changedata",
}

export enum EmitterEvents {
    CLICKED = "clicked",
    DOUBLE_CLICKED = "doubleClicked",
    HOVER_IN = "hoverIn",
    HOVER_OUT = "hoverOut",
    ADJACENCY_ON = "adjacencyOn",
    ADJACENCY_OFF = "adjacencyOff",
    REFRESH_STATE = "updateState",
    POINTER_LEFT = "pointer_left",
    POINTER_RIGHT = "pointer_right",
}

export enum GameEvents {
    MINE_REVEALED = "mine_uncovered",
    CELL_UNCOVERED = "cell_uncovered",
    CELL_FLAGGED = "cell_flagged",
    CELL_UNFLAGGED = "cell_unflagged",
}

export enum Textures {
    COVERED = "covered",
    FLAGGED = "flagged",
    HOVER = "hover",
    ADJACENT = "adjacent",
    MINED = "mine",
}

// export enum UncoveredTextures {
//     EMPTY = "n00",
//     N01 = "n01",
//     N02 = "n02",
//     N03 = "n03",
//     N04 = "n04",
//     N05 = "n05",
//     N06 = "n06",
//     N07 = "n07",
//     N08 = "n08",
// }

export enum SoundKeys {
    UNCOVERED_1 = "UNCOVERED_1",
    UNCOVERED_2 = "UNCOVERED_2",
    UNCOVERED_LONG_1 = "UNCOVERED_LONG_1",
    MINE_UNCOVER_1 = "MINE_UNCOVER_1",
    FLAGGED_1 = "FLAGGED_1",
    FLAGGED_2 = "FLAGGED_2",
    FLAGGED_3 = "FLAGGED_3",
    UNFLAG_1 = "UNFLAG_1",
    UNFLAG_2 = "UNFLAG_2"
}



