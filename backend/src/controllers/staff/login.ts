import type { RequestHandler } from "express";
import { StaffModel } from "../../database/schema/staff.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const { StaffID, password } = req.body;
  try {
    const staff = await StaffModel.findOne({ StaffID: StaffID });
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
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Unathourized 401" });
  }

  const accessToken = authorization?.split(" ")[1] as string;
  console.log("ACC", accessToken)
  try {
    const { staff } = jwt.verify(accessToken, "builder") as {
      staff: Omit<typeof StaffModel, "password">;
    };
    console.log(staff)
    res.status(201).json({ staff });
  } catch (error) {
    console.error(error,"DGGSAG");
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
