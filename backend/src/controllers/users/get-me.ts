import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../database/schema/user.schema.js";

export const getMe: RequestHandler = async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authorization.split(" ")[1] as string;
  try {
    const { user } = jwt.verify(token, "mountain", {
      algorithms: ["HS384"],
    }) as { user: Omit<typeof UserModel, "password"> };
    
    // Fetch the full user data from database to include address
    const fullUser = await UserModel.findById(user._id).select("-password");
    
    res.status(200).json({ user: fullUser });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
