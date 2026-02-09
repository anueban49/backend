import { Router } from "express";
import { addNewStaff } from "../controllers/staff/addNewStaff.js";
import { getStaffsInfo } from "../controllers/staff/getStaffsInfo.js";
import { fetchStaff, login } from "../controllers/staff/login.js";
import { staffMiddleWare } from "../middleware/auth.middleware.js";

const StaffsRouter = Router();

StaffsRouter.get("/list", getStaffsInfo)
  .post("/add", addNewStaff)
  .post("/login", login)
  .get("/fetchstaff", staffMiddleWare,fetchStaff);
export { StaffsRouter };
