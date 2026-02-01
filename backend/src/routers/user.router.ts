import { Router } from "express";
import { login } from "../controllers/users/login.js";
import { register } from "../controllers/users/register.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { getMe } from "../controllers/users/get-me.js";
import { updateUser, updateDeliveryAddress } from "../controllers/users/updateUser.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const UserRouter = Router();
UserRouter.post("/signup", register)
  .post("/login", login)
  .patch("/update", authMiddleWare, updateUser)
  .patch('/update/address', authMiddleWare, updateDeliveryAddress)
  .get("/me", getMe)
  .get("/", getUsers);
export { UserRouter };
