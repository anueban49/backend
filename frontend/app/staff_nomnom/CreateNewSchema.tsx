import * as z from "zod";
const MAX_UPLOAD_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg, image/jpg, image/png, image/webp"];

const ImageSchema = z
  .instanceof(File, { message: "Insert image of dish" })
  .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    `jps, jpeg, png, webp are accepted.`
  );
export const createNewSchema = z.object({
  name: z.string(),
  price: z.string(),
  ingredients: z.string(),
  category: z.string(),
  image: ImageSchema,
});
export type CreatenewType = z.infer<typeof createNewSchema>;
