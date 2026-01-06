//Contains route definitions that map URLs to controller functions. Routers handle HTTP methods and delegate to controllers
import { Router } from "express";
import { getCategories } from "../controllers/categories/getCategories.js";
import { createCategory } from "../controllers/categories/createCategories.js";

const CategoryRouter = Router();

CategoryRouter.get("/categories", getCategories).post("/categories/create", createCategory);
export { CategoryRouter };
