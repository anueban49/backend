import express from "express";
import "dotenv/config";
import { connectToDB } from "./database/index.js";
import { ProductRouter } from "./routers/product.router.js";

await connectToDB();

const app = express();

app.use(express.json());
app.use('/product', ProductRouter); 

const port = 4049;

app.listen(port, () => {
  console.log(`Example app listening on port 4049`);
});

// Cloudinary = File storage (images, videos)
// MongoDB = Metadata storage (URLs, prices, descriptions)
// Always store the publicId from Cloudinary for later deletion/updates
// Use Cloudinary transformations for responsive images
// Keep image URLs in MongoDB for fast queries
