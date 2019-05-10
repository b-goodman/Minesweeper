(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "redux-starter-kit"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const redux_starter_kit_1 = require("redux-starter-kit");
    const rootReducer = redux_starter_kit_1.createReducer([], {});
    exports.default = rootReducer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVkdWNlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSx5REFBa0Q7SUFHbEQsTUFBTSxXQUFXLEdBQUcsaUNBQWEsQ0FBRSxFQUFFLEVBQUUsRUFFdEMsQ0FBQyxDQUFDO0lBR0gsa0JBQWUsV0FBVyxDQUFDIn0=