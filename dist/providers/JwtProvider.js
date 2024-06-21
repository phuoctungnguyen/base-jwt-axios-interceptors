"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (user, secretSignature, tokenLife) => {
    try {
        return jsonwebtoken_1.default.sign(user, secretSignature, {
            algorithm: "HS256",
            expiresIn: tokenLife,
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
};
const verifyToken = async (token, secretSignature) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretSignature);
    }
    catch (err) {
        throw new Error(err.message);
    }
};
exports.JwtProvider = {
    generateToken,
    verifyToken,
};
//# sourceMappingURL=JwtProvider.js.map