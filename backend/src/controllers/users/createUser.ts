import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import bcrypt from "bcrypt"; //-> note: Because of ts installed, I had to install its type as well
import { hash } from "node:crypto"; //-> idk what is this, suddenly appeared 

export const createUser: RequestHandler = async (req, res) => {
  try {
    const { username, password, email, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await UserModel.create({
      username,
      password: hashedPassword,
      email,
      address,
    });
    res.status(201).json({
      id: User._id,
      username: User.username,
      email: User.email,
    });
  } catch (error: any) {
    res.status(501).json({ message: error.message });
  }
};
