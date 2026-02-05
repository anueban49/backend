import { Router } from "express";
import { CreateOrder } from "../controllers/orders/createOrder.js";
import { getOrders } from "../controllers/orders/getOrder.js";
import { getOrderByuserID } from "../controllers/orders/getOrderByuserID.js";
import { staffMiddleWare } from "../middleware/auth.middleware.js";
import { updateOrderStatus } from "../controllers/orders/updateOrderStatus.js";
const OrderRouter = Router();
OrderRouter.get("/all", getOrders)
  .post("/create", CreateOrder)
  .get("/:id", getOrderByuserID)
  .patch("/:id", staffMiddleWare, updateOrderStatus);
export { OrderRouter };
