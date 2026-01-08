import * as z from 'zod';

export const createNewSchema = z.object({
  name: z.string(),
  price: z.string(),
  ingredients: z.string(),
  category: z.string(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5 MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "jpeg/jpg/png"
    ),
});
export type CreatenewType = z.infer<typeof createNewSchema>;