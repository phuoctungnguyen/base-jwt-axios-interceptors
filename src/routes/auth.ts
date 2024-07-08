import express from "express";
import { registerUser, login, logout } from "../controllers/AuthControllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
