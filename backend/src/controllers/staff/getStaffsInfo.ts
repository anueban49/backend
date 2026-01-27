import type { RequestHandler } from "express";
import { staffModel } from "../../database/schema/staff.schema.js";

export const getStaffsInfo: RequestHandler = async (_req, res) => {
  const Staffs = await staffModel.find({});
  res.status(201).json(Staffs);
};
export const getStaffbyID: RequestHandler = async (req, res) => {
  try {
    const entity = await staffModel.findById(req.params.id);
    if (!entity) {
      res.status(404).json({ success: false, message: "Staff ID not found" });
    }
    res.status(200).json(entity);
  } catch (error) {
    return res.status(500).json(error);
  }
};
