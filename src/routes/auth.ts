import express from "express";
import {
  registerUser,
  login,
  logout,
  refreshToken,
} from "../controllers/AuthControllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.delete("/logout", logout);
router.put("/refresh_token", refreshToken);

export default router;
