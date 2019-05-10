import Cell from 'minesweeper/src/Cell';
export interface DefaultState {
    readonly Cells: ReadonlyArray<readonly Cell[]>;
}
declare const _default: (rows: number) => import("redux-starter-kit/src/configureStore").EnhancedStore<any, import("redux").AnyAction>;
export default _default;
