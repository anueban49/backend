import * as z from "zod";
export const formSchema = z
  .object({
    username: z.string().min(5),
    email: z
      .string()
      .email({ message: "Invalid email. Use a format like example@email.com." })
      .toLowerCase(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirmpassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmpassword, {
    error: "Passwords don't match",
    path: ["confirmpassword"],
  });
export type userFormdata = z.infer<typeof formSchema>;
