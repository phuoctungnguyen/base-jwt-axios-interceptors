import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import ms from "ms";
import { JwtProvider } from "../providers/JwtProvider";
import { Document } from "mongoose";

interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  exp: any;
}
// interface JwtPayload {
//   id: string;
// }

const accessKeySignature: string = process.env.JWT_ACCESS_KEY || "default_key";
const refreshKeySignature: string =
  process.env.JWT_REFRESH_KEY || "default_key";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const salt: string = await bcrypt.genSalt(10);
    const hashed: string = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (await User.findOne({
      username: req.body.username,
    }).lean()) as UserDocument;
    // console.log(user, "user");
    if (!user) {
      res.status(404).json("wrong username!");
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json("wrong password!");
      return;
    }
    if (user && validPassword) {
      const accessToken = await JwtProvider.generateToken(
        user,
        accessKeySignature,
        "600s"
      );
      const refreshToken = await JwtProvider.generateToken(
        user,
        refreshKeySignature,
        "14d"
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("14 days"),
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("14 days"),
      });
      const { password, ...others } = user;
      res.status(200).json({ others, accessToken, refreshToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json("logout api success");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // cach 1 lấy luôn từ cookie đã đính kèm vào request
    // const refreshTokenFromCookie = req.cookies?.refreshToken;

    // cach 2 từ localstorage phía FE sẽ truyền vào body khi gọi api
    const refreshTokenFromBody = req.body?.refreshToken;

    // verif giải mã cái refreshToken xem có hợp lệ hay không

    const refreshTokenDecoded = await JwtProvider.verifyToken(
      // refreshTokenFromCookie, //cach 1
      refreshTokenFromBody, // cach 2
      refreshKeySignature
    );
    // console.log(refreshTokenDecoded, "refreshTokenDecoded");
    // Đoạn này chúng ta chỉ cần lưu nhữg thông tin uique và cố định của user trong token rồi vì vậy có thể lấy luôn từ decode ra tiết kiệm query từ DB để lấy data mới
    // const userInfo = {
    //   id: refreshTokenDecoded._id as JwtPayload,
    // };
    // const user = {
    //   id: refreshTokenDecoded._id,
    // } as UserDocument;
    const { exp, ...others } = refreshTokenDecoded as UserDocument;
    const user = others;
    // console.log(others, "user");
    // tạo accessToken mới
    const accessToken = await JwtProvider.generateToken(
      user,
      accessKeySignature,
      "600s"
    );
    // console.log(accessToken, "access token");
    // res lại cookie accessToken mới cho trường hợp sử dụg cookies
    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    //   maxAge: ms("14 days"),
    // });
    // trả về accessToke mới cho trường hợp FE cần update lại trong localstorage

    res.status(200).json(accessToken);
  } catch (err) {
    // console.log(err);
    res.status(500).json("refresh token api Faild.");
  }
};
