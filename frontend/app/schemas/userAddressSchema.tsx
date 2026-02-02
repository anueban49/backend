import * as z from "zod";

export const userAddressSchema = z.object({
  state: z.string().min(5),
  city: z.string(),
  street: z.string(),
  door: z.string(),
  additional: z.string().optional(),
  zipcode: z.string().min(5).optional(),
});

export type AddressFormdata = z.infer<typeof userAddressSchema>;
