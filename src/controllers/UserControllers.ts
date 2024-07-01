import User from "../models/UserModel";
import { Request, Response } from "express";

export const getUser = async (_req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
