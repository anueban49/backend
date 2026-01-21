//Contains route definitions that map URLs to controller functions. Routers handle HTTP methods and delegate to controllers
import { Router } from "express";
import { getProducts } from "../controllers/product/getProduct.js";
import { createProduct } from "../controllers/product/createProduct.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";
const ProductRouter = Router();

ProductRouter.get("/products", getProducts)
  .post("/products/create", createProduct)
  .patch("/products/:id", updateProduct)
  .delete("products/:id", deleteProduct);
export { ProductRouter };
