import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../database/schema/user.schema.js";
export const getMe: RequestHandler = async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization?.split(" ")[1] as string;
  try {
    const { user } = jwt.verify(token, "mountain", {
      algorithms: ["HS384"],
    }) as { user: Omit<typeof UserModel, "password"> };
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
  }
};
