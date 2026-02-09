import type { RequestHandler } from "express";
import { UserModel } from "../../database/schema/user.schema.js";
import jwt from "jsonwebtoken";
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
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

export const updateDeliveryAddress: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const updatedAddress = req.body;
  if (userId !== id) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      { address: updatedAddress },
      { new: true },
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "address failed to update (updateuser.ts)",
      });
    }
    return res.status(200).json({
      message: "successfully updated, (updateuser.ts)",
      address: updated.address,
    });
  } catch (error: any) {
    return res.status(500).json({ message: "fail-error (updateuser.ts)" });
  }
};
