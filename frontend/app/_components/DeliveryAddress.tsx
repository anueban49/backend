"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthProvider";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  userAddressSchema,
  AddressFormdata,
} from "../schemas/userAddressSchema";
import { api } from "@/lib/axios";
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
            Add Location
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
export default function DeliveryAddress() {
  const { user } = useAuth();
  console.log("deliveryaddress comp:", user);
  if (!user) {
    return <AddDeliveryAddress />;
  }

  return (
    <div>
      <div className="flex bg-white p-4 w-80 gap-2 h-10 items-center justify-center rounded-2xl">
        <MapPin />
        Delivery Location:
        {user.address ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button>{user.address}</Button>
            </PopoverTrigger>
          </Popover>
        ) : (
          <AddDeliveryAddress />
        )}
      </div>
    </div>
  );
}
