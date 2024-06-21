"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthControllers_1 = require("../controllers/AuthControllers");
const router = express_1.default.Router();
router.post("/register", AuthControllers_1.registerUser);
router.post("/login", AuthControllers_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map