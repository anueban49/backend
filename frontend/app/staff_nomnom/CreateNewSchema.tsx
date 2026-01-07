import * as z from 'zod';

export const createNewSchema = z.object({
  name: z.string(),
  price: z.number(),
  ingredients: z.string(),
  category: z.string(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5 MB")
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "only jpg or png allowed"
    ),
});
export type CreatenewType = z.infer<typeof createNewSchema>;