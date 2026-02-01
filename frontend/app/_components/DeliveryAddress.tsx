"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  userAddressSchema,
  AddressFormdata,
} from "../schemas/userAddressSchema";
import { useCart } from "@/context/CartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export const AddDeliveryAddress = () => {
  //a function for adding a new delivery address to the database.
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
  const onSubmit = (data: AddressFormdata) => {
    console.log("updated address: ", data);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="text-gray-400">Add Location</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Your Delivery Location</DialogTitle>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
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

              <Button
                className="w-full"
                type="submit"
              >
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
export default function DeliveryAddress() {
  const { user } = useAuth();

  if (!user) {
    console.log("failed to fetch user");
    return;
  }

  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="rounded-2xl">
            <MapPin />
            Delivery Location:
            {user.address ? (
              <PopoverContent>
                <p>{user.address}</p>\
                <Button>Edit Address</Button>
              </PopoverContent>
            ) : (
                <AddDeliveryAddress/>
            )}
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
}
