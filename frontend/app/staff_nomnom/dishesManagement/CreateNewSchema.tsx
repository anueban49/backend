import * as z from "zod";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg, image/jpg, image/png, image/webp"];
const ImageSchema = z
  .instanceof(File)
  .refine(
    (file) => !file || file.size <= MAX_UPLOAD_SIZE,
    "Max file size is 5MB"
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type),
    ".jpg, .png, and .webp formats are supported"
  );
export const createNewSchema = z.object({
  name: z.string(),
  price: z.number(),
  ingredients: z.string(),
  category: z.string(),
  image: z.string(),
});
export type CreatenewType = z.infer<typeof createNewSchema>;
