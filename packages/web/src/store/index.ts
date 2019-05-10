import { DeepPartial } from "redux";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import rootReducer from "../reducers";

import {Cell, Game} from "@minesweeper/core"

export interface DefaultState {

        readonly Cells: ReadonlyArray<readonly Cell[]>;

}

export default (rows: number) => {

    const Grid = new Game(rows);

    const defaultState: DeepPartial<DefaultState> = {
        Cells: Grid.Cells
    };

    const store = configureStore({
        middleware: [...getDefaultMiddleware(),],
        preloadedState: defaultState,
        reducer: rootReducer,
    });

// tslint:disable-next-line: no-if-statement
    // if (process.env.NODE_ENV !== 'production' && module.hot) {
    //     module.hot.accept("../reducers/index", () => store.replaceReducer(rootReducer))
    // };

    return store;
}