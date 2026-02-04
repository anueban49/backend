import type { RequestHandler } from "express";
import { staffModel } from "../../database/schema/staff.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const { StaffID, password } = req.body;
  try {
    const staff = await staffModel.findOne({ StaffID: StaffID });
    if (!staff) {
      return res
        .status(401)
        .json({ success: false, message: "StaffId doesn't exist" });
    }
    const ispasswordvalid = await bcrypt.compare(password, staff.password);
    if (!ispasswordvalid) {
      return res
        .status(401)
        .json({ success: false, message: "StaffID not found" });
    }
    const { password: staffPassword, ...rest } = staff.toObject();

    const accessToken = jwt.sign({ staff: rest }, "builder");

    res.status(201).json({ staff: rest, accessToken });
  } catch (error) {
    console.error(error);
  }
};

export const fetchStaff: RequestHandler = async (req, res) => {
  const authorizatition = req.headers.authorization;
  if (!authorizatition) {
    return res.status(401).json({ message: "Unathourized 401" });
  }

  const accessToken = authorizatition?.split(" ")[1] as string;
  try {
    const { staff } = jwt.verify(accessToken, "builder") as {
      staff: Omit<typeof staffModel, "password">;
    };
    res.status(201).json({ staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
