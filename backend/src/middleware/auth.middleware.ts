import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const authMiddleWare: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const token = authorization.split(" ")[1] as string;
  try {
    //veryfying the token
    const { user } = jwt.verify(token, "mountain", {
      algorithms: ["HS384"],
    }) as { user: { _id: string } };
    //Middleware → Extracts & verifies token, attaches userId to the request object
    req.userId = user._id;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};
export const staffMiddleWare: RequestHandler = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .json({ success: false, message: "unauthorized [backend]" });
  }

  try {
    const accessToken = authorization.split(" ")[1] as string;
    const { staff } = jwt.verify(accessToken, "builder") as {
      staff: { _id: string };
    };
    req.staffId = staff._id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error });
  }
};
