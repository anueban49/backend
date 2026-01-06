import { Router } from "express";
import { addNewStaff } from "../controllers/staff/addNewStaff.js";
import { getStaffsInfo } from "../controllers/staff/getStaffsInfo.js";

const StaffsRouter = Router();

StaffsRouter.get("/staffs", getStaffsInfo).post("/staffs/addnew", addNewStaff);
export { StaffsRouter };
