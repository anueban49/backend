import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import bcrypt from "bcrypt"; //-> note: Because of ts installed, I had to install its type as well
import jwt from "jsonwebtoken";
//verify that the user exists

export const login: RequestHandler = async (req, res) => {
  try {
    const { password, email } = req.body;
    //find if the user exists
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User Not Found" });
    //comparing password with hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "username or password wrong" });

    const { password: userPassword, ...rest } = user.toObject();

    //generating jwt
    const accessToken = jwt.sign({ user: rest }, "mountain", {
      algorithm: "HS384",
    });

    res.status(201).json({
      user: rest,
      accessToken,
    });
  } catch (error: any) {
    res.status(501).json({ message: error.message });
  }
};
