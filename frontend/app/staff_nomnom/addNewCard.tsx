"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormState } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { CategoryType } from "./page";

import { createNewSchema, CreatenewType } from "./CreateNewSchema";

//Inputs → react-hook-form state → Zod validation → onSubmit(data) → API request

export function CreateNewDish() {
  //this here is just a <CreateNewDish> COMPONENT. its a COMPONENT, not the ACTUAL function.
  const [cath, setCath] = useState<CategoryType[]>([])
  useEffect(() => {
    const getCathData = async () => {
      const { data } = await api.get<CategoryType[]>("/category/categories");
      setCath(data);
    };
    getCathData();
  }, []);

  const form = useForm<CreatenewType>({
    //-> this a react hook form
    resolver: zodResolver(createNewSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      price: undefined,
      ingredients: "",
      category: "",
      image: undefined,
    },
  });
  const onSubmit = async (data: CreatenewType) => {
    //this has to be where data is created & sent
    try {
      await api.post("product/products/create", {
        name: data.name,
        price: data.price,
        ingredients: data.ingredients,
        category: data.category,
        image: data.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute ">
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onsubmit)}
          className="space-y-4 flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dish Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="price" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Ingreds</FormLabel>
                <FormControl>
                  <Input type="ingredients" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled className="w-full" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
