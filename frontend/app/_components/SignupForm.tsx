//this willl take two steps => enter email and confirm password and password
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { formSchema, userFormdata } from "./userSchema";
import { useAuth } from "./AuthProvider";
import { FormEvent, useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SignupForm() {
  const { signup, error } = useAuth();
  const form = useForm<userFormdata>({
    resolver: zodResolver(formSchema),
    mode: "onChange", //<_ this part validates as user type. important
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signup(form);
  }
  return (
    <div className="flex flex-col gap-4 scale-80">
      <h3 className="text-2xl font-semibold">Create Your Account</h3>
      <p>Sign up to explore your favourite dishes</p>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onsubmit)}
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

          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled="true"
            className="w-full"
            type="submit"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            Let's Go
          </Button>
        </form>
      </Form>
    </div>
  );
}
