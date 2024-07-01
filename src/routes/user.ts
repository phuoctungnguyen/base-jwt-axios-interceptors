import express from "express";
import { getUser } from "../controllers/UserControllers";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/getAllUser", authMiddleware.isAuthorized, getUser);

export default router;
