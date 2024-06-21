import JWT, { JwtPayload, Secret } from "jsonwebtoken";

interface User {
  id: string;
  username: string;
  email: string;
  admin: boolean; // nếu có các thuộc tính khác, thêm điều này
}

const generateToken = async (
  user: User,
  secretSignature: Secret,
  tokenLife: string | number
): Promise<string> => {
  try {
    return JWT.sign(user, secretSignature, {
      algorithm: "HS256",
      expiresIn: tokenLife,
    });
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

const verifyToken = async (
  token: string,
  secretSignature: Secret
): Promise<string | JwtPayload> => {
  try {
    return JWT.verify(token, secretSignature);
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const JwtProvider = {
  generateToken,
  verifyToken,
};
