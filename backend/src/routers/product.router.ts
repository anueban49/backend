//Contains route definitions that map URLs to controller functions. Routers handle HTTP methods and delegate to controllers
import { Router } from "express";
import {
  getProductbyId,
  getProducts,
  getProductsByCategory
} from "../controllers/product/getProduct.js";
import { createProduct } from "../controllers/product/createProduct.js";
import { updateProduct } from "../controllers/product/updateProduct.js";
import { deleteProduct } from "../controllers/product/deleteProduct.js";
const ProductRouter = Router();

ProductRouter.get("/all", getProducts)
  .get('/category/:category', getProductsByCategory)
  .get('/:id', getProductbyId)
  .post("/create", createProduct)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);
export { ProductRouter };
