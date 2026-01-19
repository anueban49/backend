//a function that is called on POST request -> is a controller
import type { RequestHandler } from "express";
import { ProductModel } from "../../database/schema/product.schema.js";
import cloudinary from "../../database/cloudinary.js";
import { uploadSingle, uploadMultiple } from "../../middleware/multer.js";

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, price, ingredient, category, image } = req.body;
    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file?.mimetype};base64,${req.file?.buffer.toString("base64")}`,
      {
        folder: "cateringImages",
      },
    );
    const Product = await ProductModel.create({
      name,
      price,
      ingredients,
      categories,
      image: uploadResult.secure_url, //it expects url.
    });
    res.status(201).json(Product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
