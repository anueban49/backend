//Contains route definitions that map URLs to controller functions. Routers handle HTTP methods and delegate to controllers
import { Router } from "express";
import {
  getCategories,
  getCategorybyId,
} from "../controllers/categories/getCategories.js";
import { createCategory } from "../controllers/categories/createCategories.js";
import { deleteCategory } from "../controllers/categories/deleteCategory.js";

const CategoryRouter = Router();

CategoryRouter.get("/all", getCategories)
  .get("/:id", getCategorybyId)
  .post("/create", createCategory)
  .delete("/delete", deleteCategory);
export { CategoryRouter };
