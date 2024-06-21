import express from "express";
import { registerUser, login } from "../controllers/AuthControllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;
