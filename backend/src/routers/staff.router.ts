import { Router } from "express";
import { addNewStaff } from "../controllers/staff/addNewStaff.js";
import { getStaffsInfo } from "../controllers/staff/getStaffsInfo.js";

const StaffsRouter = Router();

StaffsRouter.get("/list", getStaffsInfo).post("/add", addNewStaff);
export { StaffsRouter };
