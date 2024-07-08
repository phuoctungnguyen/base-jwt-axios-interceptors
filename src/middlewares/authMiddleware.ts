import { JwtProvider } from "../providers/JwtProvider";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  jwtDecoded?: any;
}
const accessKeySignature: string = process.env.JWT_ACCESS_KEY || "default_key";
// const refreshKeySignature: string =
//   process.env.JWT_REFRESH_KEY || "default_key";
const isAuthorized = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // const accessTokenFromCookie = req.cookies?.accessToken; //cach 1
  // console.log("accessTokenFromCookie", accessTokenFromCookie);
  // console.log("------------");
  const accessTokenFromHeader = req.headers?.authorization; // cach 2
  // console.log("accessTokenFromHeader", req.headers);

  // if (!accessTokenFromCookie) {
  //   //cach 1
  //   res.status(401).json("Unauthorized! (Token not found)");
  //   return;
  // }
  if (!accessTokenFromHeader) {
    // cach 2
    res.status(401).json("Unauthorized! (Token not found)");
    return;
  }

  try {
    const accessTokenDecoded = await JwtProvider.verifyToken(
      // accessTokenFromCookie, //cach 1
      accessTokenFromHeader.substring(7), // cach 2
      accessKeySignature
    );
    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    console.log(error, "error from middleware");
    if (error.message?.includes("jwt expired")) {
      res.status(410).json("Need to refreshToken");
      return;
    }
    res.status(401).json("Unauthorized! Please login");
  }
};

export const authMiddleware = {
  isAuthorized,
};
