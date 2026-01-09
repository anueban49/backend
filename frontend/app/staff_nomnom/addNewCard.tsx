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
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";

//Inputs → react-hook-form state → Zod validation → onSubmit(data) → API request

export function CreateNewDish() {
  //this here is just a <CreateNewDish> COMPONENT. its a COMPONENT, not the ACTUAL function.
  const [cath, setCath] = useState<CategoryType[]>([]);
  const form = useForm<z.infer<typeof createNewSchema>>({
    resolver: zodResolver(createNewSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      price: "",
      ingredients: "",
      category: "",
      image: undefined,
    },
  });
  useEffect(() => {
    const getCathData = async () => {
      const { data } = await api.get<CategoryType[]>("/category/categories");
      setCath(data);
      console.log(data);
    };
    getCathData();
  }, []);

  const onSubmit = async (data: CreatenewType) => {
    //this has to be where data is created & sent
    try {
      await api.post("product/products/create", {
        name: data.name,
        price: parseFloat(data.price),
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
          onSubmit={form.handleSubmit(onSubmit)}
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
                <FormControl autoCapitalize="words">
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
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input
                    type="ingredients"
                    placeholder="Type Ingredients"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cath.map((el) => (
                      <SelectItem value={el._id}>{el.name}</SelectItem>
                    ))}
                  </SelectContent>
                  {/* <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type={"button"}
                          variant={"outline"}
                          className="w-full justify-start"
                        >
                          {field.value?.length > 0
                            ? `${field.value.length} selected`
                            : "Choose Categories"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-2 z-99 bg-white shadow-md rounded-2xl">
                        <div className="flex flex-col gap-1">
                          {cath.map((el) => {
                            const isSelected = field.value?.includes(el._id);
                            return (
                              <Button
                                type="button"
                                key={el._id}
                                variant={isSelected ? "default" : "ghost"}
                                className="justify-start rounded-xl scale-95 text-sm leading-0"
                                onClick={() => {
                                  const current = field.value;
                                  const updated = isSelected
                                    ? current.filter(
                                        (id: string) => id !== el._id
                                      )
                                    : [...current, el._id];
                                  field.onChange(updated);
                                }}
                              >
                                {el.name}
                              </Button>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover> */}
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input type="file" {...field}>
                    {field.value ? (
                      <img
                        src={URL.createObjectURL(field.value)}
                        alt="Preview"
                        className=" object-cover "
                      />
                    ) : (
                      <span className="text-gray-500">{"Upload image"}</span>
                    )}
                  </Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
