//Contains route definitions that map URLs to controller functions. Routers handle HTTP methods and delegate to controllers
import { Router } from "express";
import { getProducts } from "../controllers/product/getProduct.js";
import { createProduct } from "../controllers/product/createProduct.js";
import { uploadSingle } from "../middleware/multer.js";

const ProductRouter = Router();

ProductRouter.get("/products", getProducts).post("/products/create", uploadSingle, createProduct);
export { ProductRouter };
