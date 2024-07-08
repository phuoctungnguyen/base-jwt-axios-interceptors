"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: function (_origin, callback) {
        return callback(null, true);
    },
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOptions.js.map