import type { RequestHandler } from "express";
import { staffModel } from "../../database/schema/staff.schema.js";

export const getStaffsInfo: RequestHandler = async (req, res) => {
  const Staffs = await staffModel.find({});
  res.status(201).json(Staffs);
};
