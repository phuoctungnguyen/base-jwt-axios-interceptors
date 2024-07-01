"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const JwtProvider_1 = require("../providers/JwtProvider");
const accessKeySignature = process.env.JWT_ACCESS_KEY || "default_key";
const isAuthorized = async (req, res, next) => {
    var _a, _b;
    const accessTokenFromHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    if (!accessTokenFromHeader) {
        res.status(401).json("Unauthorized! (Token not found)");
        return;
    }
    try {
        const accessTokenDecoded = await JwtProvider_1.JwtProvider.verifyToken(accessTokenFromHeader.substring(7), accessKeySignature);
        req.jwtDecoded = accessTokenDecoded;
        next();
    }
    catch (error) {
        console.log(error, "error from middleware");
        if ((_b = error.message) === null || _b === void 0 ? void 0 : _b.includes("jwt expired")) {
            res.status(410).json("Need to refreshToken");
            return;
        }
        res.status(401).json("Unauthorized! Please login");
    }
};
exports.authMiddleware = {
    isAuthorized,
};
//# sourceMappingURL=authMiddleware.js.map