"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const getUser = async (_req, res) => {
    try {
        const user = await UserModel_1.default.find();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=UserControllers.js.map