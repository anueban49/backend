import { Router } from "express";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";
import { getUsers } from "../controllers/users/getUsers.js";

const UserRouter = Router();
UserRouter.post("/signup", register).post("/login", login).get("/", getUsers);
export { UserRouter };
