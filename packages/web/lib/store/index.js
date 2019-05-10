var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "redux-starter-kit", "../reducers", "minesweeper/src/Grid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const redux_starter_kit_1 = require("redux-starter-kit");
    const reducers_1 = __importDefault(require("../reducers"));
    const Grid_1 = __importDefault(require("minesweeper/src/Grid"));
    exports.default = (rows) => {
        // tslint:disable: no-expression-statement
        // tslint:disable: no-unused-expression
        new Grid_1.default(rows);
        const defaultState = {
            Cells: Grid_1.default.Cells
        };
        const store = redux_starter_kit_1.configureStore({
            middleware: [...redux_starter_kit_1.getDefaultMiddleware(),],
            preloadedState: defaultState,
            reducer: reducers_1.default,
        });
        // tslint:disable-next-line: no-if-statement
        if (process.env.NODE_ENV !== 'production' && module.hot) {
            module.hot.accept("../reducers/index", () => store.replaceReducer(reducers_1.default));
        }
        ;
        return store;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSx5REFBd0U7SUFDeEUsMkRBQXNDO0lBR3RDLGdFQUF1QztJQVN2QyxrQkFBZSxDQUFDLElBQVksRUFBRSxFQUFFO1FBRWhDLDBDQUEwQztRQUMxQyx1Q0FBdUM7UUFDbkMsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZixNQUFNLFlBQVksR0FBOEI7WUFFNUMsS0FBSyxFQUFFLGNBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUM7UUFHRixNQUFNLEtBQUssR0FBRyxrQ0FBYyxDQUFDO1lBQ3pCLFVBQVUsRUFBRSxDQUFDLEdBQUcsd0NBQW9CLEVBQUUsRUFBRTtZQUN4QyxjQUFjLEVBQUUsWUFBWTtZQUM1QixPQUFPLEVBQUUsa0JBQVc7U0FDdkIsQ0FBQyxDQUFDO1FBRVAsNENBQTRDO1FBQ3hDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxrQkFBVyxDQUFDLENBQUMsQ0FBQTtTQUNsRjtRQUFBLENBQUM7UUFFRixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUEifQ==