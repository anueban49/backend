import express from "express";
import { config } from "dotenv";
import { connectToDB } from "./database/index.js";
import { ProductRouter } from "./routers/product.router.js";
import { CategoryRouter } from "./routers/category.router.js";
import { UserRouter } from "./routers/clientauth.router.js";
import { StaffsRouter } from "./routers/staff.router.js";
import { OrderRouter } from "./routers/order.router.js";
import cors from "cors";

config();

await connectToDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);
app.use("/user", UserRouter);
app.use("/staff", StaffsRouter);
app.use("/order", OrderRouter);

const port = 4049;

app.listen(port, () => {
  console.log(`Example app listening on port 4049`);
});

// Cloudinary = File storage (images, videos)
// MongoDB = Metadata storage (URLs, prices, descriptions)
// Always store the publicId from Cloudinary for later deletion/updates
// Use Cloudinary transformations for responsive images
// Keep image URLs in MongoDB for fast queries
