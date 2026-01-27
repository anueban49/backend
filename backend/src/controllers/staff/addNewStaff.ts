import type { RequestHandler } from "express";
import { staffModel } from "../../database/schema/staff.schema.js";
import bcrypt from "bcrypt";
export const addNewStaff: RequestHandler = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const body = req.body;
    const Staff = await staffModel.create({
      username: body.username,
      id: body._id,
      password: hashedPassword,
      email: body.email,
    });
    res.status(201).json({
        id: Staff._id,
        username: Staff.username,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
