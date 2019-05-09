import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import rootReducer from "../reducers";

import Cell from 'minesweeper/src/Cell';
import Grid from "minesweeper/src/Grid"
import { DeepPartial } from 'redux';

export interface DefaultState {

        readonly Cells: ReadonlyArray<readonly Cell[]>;

}

export default (rows: number) => {

// tslint:disable: no-expression-statement
// tslint:disable: no-unused-expression
    new Grid(rows);

    const defaultState: DeepPartial<DefaultState> = {

        Cells: Grid.Cells
    };


    const store = configureStore({
        middleware: [...getDefaultMiddleware(),],
        preloadedState: defaultState,
        reducer: rootReducer,
    });

// tslint:disable-next-line: no-if-statement
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept("../reducers/index", () => store.replaceReducer(rootReducer))
    };

    return store;
}