//a function that is called on POST request -> is a controller
import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, price, ingredients, category, image } = req.body;
    const Product = await ProductModel.create({
      name,
      price: parseFloat(price),
      ingredients: ingredients.split(',').map((s: string) => s.trim()),
      category,
      image: image.url,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: Product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create product",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

//so basically there are three types of this classic mongodb & cloudinary architecture; and those are:
// 1.Frontend uploads image -> backend (sends Base64 or image url to your API)
//2. Backend uploads to cloudinary : for example
//{ so cloudinary returns an object like this:
//   public_id: "cateringImages/my-image",
//   secure_url: "https://res.cloudinary.com/...",
//   width: 800,
//   height: 600
// }
//3. then save the cloudinary response to mongodb -> without having to store images in mongodb, only metadata of cloudinary is saved in mongodb
// i will need to upload images to cloudinary, and it will return base64 and image url, public id back to mongodb, which the db stores.
//which is why mongodb only needs access to cloudinary metadata -> from what I was told.
