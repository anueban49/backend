import { Router } from "express";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { getMe } from "../controllers/users/get-me.js";
import { updateUser } from "../controllers/users/updateUser.js";

const UserRouter = Router();
UserRouter.post("/signup", register)
  .post("/login", login)
  .post("/update", updateUser)
  .get("/me", getMe)
  .get("/", getUsers);
export { UserRouter };
