//has two steps => enter email, enter password
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  StaffLoginFormType,
  StaffLoginSchema,
} from "@/app/schemas/StaffSchema";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStaffAuth, StaffType } from "@/context/StaffContext";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function Stafflogin() {
  const router = useRouter();
  const { staff, login } = useStaffAuth();
  const form = useForm<StaffLoginFormType>({
    resolver: zodResolver(StaffLoginSchema),
    mode: "onChange", // ← This makes it validate as you type
    defaultValues: {
      StaffID: "",
      password: "",
    },
  });
  const handleLogin = async (data: StaffLoginFormType) => {
    const success = await login(data);
    if (success) {
      router.push("/staff_nomnom");
    }
  };
  return (
    <div className="w-80">
      <>
        <Form {...form}>
          <form
            className="space-y-4 flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <FormField
              control={form.control}
              name="StaffID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Enter your Staff ID provided from the business
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                  <FormLabel>Enter your password</FormLabel>
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

            <Button className="w-full bg-red-500" type="submit">
              Log In
            </Button>
          </form>
        </Form>
        <div className="flex gap-4 align-center"></div>
      </>
    </div>
  );
}
