import { Router } from "express";
import { CreateOrder } from "../controllers/orders/createOrder.js";
import { getOrders } from "../controllers/orders/getOrder.js";
import { getOrderByuserID } from "../controllers/orders/getOrderByuserID.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const OrderRouter = Router();
OrderRouter.get("/all", getOrders)
  .post("/create", authMiddleWare, CreateOrder)
  .get("/:id", getOrderByuserID);
export { OrderRouter };
