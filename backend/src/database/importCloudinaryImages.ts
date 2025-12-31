import mongoose from "mongoose";
import cloudinary from "./cloudinary.js";
import { ProductModel } from "./schema/product.schema.js";
import { uri } from "./index.js";

//

async function getImage() {
  await mongoose.connect(uri);

  let resources = [];
  const res = await cloudinary.api.resources({
    resource_type: "image",
    type: "upload",
    max_results: 100,
  });
  resources = res.resources;
  for (const r of resources) {
    await ProductModel.findOneAndUpdate(
      { slug: r.public_id },
      {
        $set: {
          name: r.public.id,
          images: {
            url: r.secure_url,
            publicId: r.public_id,
            width: r.width,
            height: r.height,
          },
        },
      },
      { upsert: true }
    );
  }
  console.log(`Imported images: ${resources.length}`);
  mongoose.disconnect();
}
getImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
