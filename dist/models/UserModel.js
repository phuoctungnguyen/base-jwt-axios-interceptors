"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 7,
        maxlength: 60,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 60,
    },
    admin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" } });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map