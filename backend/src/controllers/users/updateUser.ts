import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User ID not found" });
    }
    res.status(201).json({ success: true, message: "user updated" });
  } catch (error) {
    console.error(error);
  }
};
