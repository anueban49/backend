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
  const userId = req.userId;
  const address = req.body;
  if (!userId) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    // normalize incoming payload to an array of strings
    let newAddress: string[] | null = null;
    if (typeof address === "string") {
      newAddress = [address];
    } else if (Array.isArray(address)) {
      newAddress = address;
    } else if (address && typeof (address as any).address === "string") {
      newAddress = [(address as any).address];
    } else if (address && Array.isArray((address as any).address)) {
      newAddress = (address as any).address;
    } else {
      return res.status(400).json({ message: "invalid address payload" });
    }

    const updated = await UserModel.findByIdAndUpdate(
      userId,
      { address: newAddress },
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
