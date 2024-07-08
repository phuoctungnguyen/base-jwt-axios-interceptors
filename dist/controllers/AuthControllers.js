"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.registerUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ms_1 = __importDefault(require("ms"));
const JwtProvider_1 = require("../providers/JwtProvider");
const accessKeySignature = process.env.JWT_ACCESS_KEY || "default_key";
const refreshKeySignature = process.env.JWT_REFRESH_KEY || "default_key";
const registerUser = async (req, res) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashed = await bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new UserModel_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.registerUser = registerUser;
const login = async (req, res) => {
    try {
        const user = (await UserModel_1.default.findOne({
            username: req.body.username,
        }).lean());
        if (!user) {
            res.status(404).json("wrong username!");
            return;
        }
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(404).json("wrong password!");
            return;
        }
        if (user && validPassword) {
            const accessToken = await JwtProvider_1.JwtProvider.generateToken(user, accessKeySignature, "600s");
            const refreshToken = await JwtProvider_1.JwtProvider.generateToken(user, refreshKeySignature, "14d");
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: (0, ms_1.default)("14 days"),
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: (0, ms_1.default)("14 days"),
            });
            const { password } = user, others = __rest(user, ["password"]);
            res.status(200).json({ others, accessToken, refreshToken });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.login = login;
const logout = async (_req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json("logout api success");
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.logout = logout;
//# sourceMappingURL=AuthControllers.js.map