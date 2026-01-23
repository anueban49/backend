//has two steps => enter email, enter password
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { formSchema, userFormdata } from "./userSchema";
import React, { useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function LoginForm() {
  const { login, signup } = useAuth();

  const router = useRouter();
  const [newuser, setNewuser] = useState(true);
  const form = useForm<userFormdata>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // ← This makes it validate as you type
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const PartOne = () => {
    return (
      <>
        <h3 className="text-2xl font-semibold">Log In To Your Account</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(login)}
            className="space-y-4 flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled className="w-full" type="submit">
              Let's go!
            </Button>
          </form>
        </Form>
        <div className="flex gap-4 align-center"></div>
      </>
    );
  };
  return (
    <div className="flex flex-col gap-4 scale-80">
      <PartOne />
    </div>
  );
}
