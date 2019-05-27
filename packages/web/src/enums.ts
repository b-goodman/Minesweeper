
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
}

export enum Textures {
    COVERED = "cover",
    FLAGGED = "flagged",
    HOVER = "hover",
    ADJACENT = "adjacent",
    MINED = "mined",
}

export enum UncoveredTextures {
    EMPTY = "n00",
    N01 = "n01",
    N02 = "n02",
    N03 = "n03",
    N04 = "n04",
    N05 = "n05",
    N06 = "n06",
    N07 = "n07",
    N08 = "n08",
}



export class UncoveredTexturesMap {

    private static textures = new Map(new Array(8+1).fill(undefined).map( (_e, i) => {
        return `n${i.toString(10).padStart(2,"0")}`}).entries()
    );

    static lookup (index:number) {
        return UncoveredTexturesMap.textures.get(index)
    }
}
