import { DeepPartial } from "redux";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import rootReducer from "../reducers";

import {Cell} from "@minesweeper/core"

const minesweeper = require("@minesweeper/core");

export interface DefaultState {

        readonly Cells: ReadonlyArray<readonly Cell[]>;

}

export default (rows: number) => {

    const grid = minesweeper(rows);

    const defaultState: DeepPartial<DefaultState> = {
        Cells: grid.Cells
    };

    const store = configureStore({
        middleware: [...getDefaultMiddleware(),],
        preloadedState: defaultState,
        reducer: rootReducer,
    });

// tslint:disable-next-line: no-if-statement
    if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
        (module as any).hot.accept("../reducers/index", () => store.replaceReducer(rootReducer))
    };

    return store;
}