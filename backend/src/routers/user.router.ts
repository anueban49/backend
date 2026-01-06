import { Router } from "express";
import { createUser } from "../controllers/users/createUser.js";
import { getUsers } from "../controllers/users/getUsers.js";
const UserRouter = Router();
UserRouter.get("/users", getUsers).post("/users/adduser", createUser);
export { UserRouter };
