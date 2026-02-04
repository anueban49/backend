"use client";
import * as z from "zod";

export const StaffLoginSchema = z.object({
  StaffID: z.string(),
  password: z.string(),
});

export type StaffLoginFormType = z.infer<typeof StaffLoginSchema>;

export const StaffRegistySchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    dob: z.date().optional(), //this wown't be sent to backend for its used for veryfying work age.
    email: z.email(),
    SSN: z.string("Please enter valid input").min(9).max(9),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirmpassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password doesn't match",
    path: ["confirmpassword"],
  });

export type StaffRegistryType = z.infer<typeof StaffRegistySchema>;
