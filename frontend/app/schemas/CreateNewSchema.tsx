import * as z from "zod";

export const createNewSchema = z.object({
  name: z.string(),
  price: z.number(),
  ingredients: z.string(),
  category: z.string(),
  image: z.file(),
});
export type CreatenewType = z.infer<typeof createNewSchema>;
