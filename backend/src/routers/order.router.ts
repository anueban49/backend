import { Router } from "express";
import { CreateOrder } from "../controllers/orders/createOrder.js";
import { getOrders } from "../controllers/orders/getOrder.js";

const OrderRouter = Router();
OrderRouter.get("/all", getOrders).post("/create", CreateOrder);
export { OrderRouter };
