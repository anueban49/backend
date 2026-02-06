"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthProvider";
import { UserCompleteInfoType } from "./AuthProvider";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressFormdata,
  userAddressSchema,
} from "../schemas/userAddressSchema";
//solutions i have:
//1.save the address schema as object, and in frontend, render it as string.
export const EditUserAddress = () => {
  const { user } = useAuth();
  const address = user?.address;

  const form = useForm<AddressFormdata>({
    resolver: zodResolver(userAddressSchema),
    mode: "onSubmit",
    defaultValues: {
      state: "",
      city: "",
      street: "",
      door: "",
      zipcode: "",
      additional: "",
    },
  });
  const SubmitAddress = async (data: AddressFormdata) => {
    const addressParts = [
      data.state,
      data.city,
      data.street,
      data.door,
      data.zipcode,
      data.additional,
    ].filter(Boolean);
    const fullAddress = addressParts.join(", ");
    console.log(fullAddress);
    try {
      const res = await api.patch("/user/update/address", {
        address: fullAddress,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="text-gray-400 rounded-2xl">
            <span>{user?.address}</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Your Delivery Location</DialogTitle>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(SubmitAddress)}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Texas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Dallas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street address</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 111 Barranca Pkwy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="door"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apt/Unit (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: Apt 305" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem className="w-60">
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: 540045" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="additional"
                render={({ field }) => (
                  <FormItem className="w-full  grid grid-rows-3">
                    <FormLabel className="w-full h-8 row-span-1">
                      Additional /optional/
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="row-span-2 px-4 h-20"
                        placeholder="..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit">
                Update
              </Button>
            </form>
          </Form>
          <div className="flex gap-4 align-center"></div>
        </DialogContent>
      </Dialog>
    </>
  );
};
