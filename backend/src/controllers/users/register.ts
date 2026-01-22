import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import bcrypt from "bcrypt"; //-> note: Because of ts installed, I had to install its type as well

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await UserModel.findOne({ email, username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    //creating a new user
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
    });
    //then remove the password from response
    const { password: _, ...rest } = newUser.toObject();
    res.status(201).json({
        user: rest
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
