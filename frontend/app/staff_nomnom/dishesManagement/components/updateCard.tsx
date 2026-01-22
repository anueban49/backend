"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Upload, X } from "lucide-react";
import { createNewSchema, CreatenewType } from "../CreateNewSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { api } from "@/lib/axios";
import {
  CrudContext,
  useIMcrud,
  CategoryType,
  ProductType,
  ProductInputType,
} from "../SSR-inventoryContext";
import { id } from "zod/v4/locales";
//firt, it fetches data of the item by id.
//second, it displays the data on the form as its default value
//onsubmit, it patches the data.
export function UpdateDialog(_id: string) {
  const [item, setItem] = useState<ProductType | undefined>(undefined);
  const { updateProduct, fetchProductbyID } = useIMcrud();
  const [open, setopen] = useState(false);
  const [preview, setPreview] = useState<String | null>(null); // the image will be url.

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductbyID(_id);
        setItem(data);
        if (data.image) {
          setPreview(data.image);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (_id) {
      loadProduct();
    }
  }, [_id, fetchProductbyID]);
  const form = useForm<z.infer<typeof createNewSchema>>({
    resolver: zodResolver(createNewSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      price: 0,
      ingredients: "",
      category: "",
      image: "",
    }, //AI suggested me toleave the default values blank -> because:
  });
  //this code below will handle the role of setting the previous data as its default value:
  useEffect(() => {
    if (item) {
      form.reset({
        name: item.name,
        price: item.price,
        ingredients: item.ingredients,
        category:
          typeof item.category === "string" ? item.category : item.category._id,
        image: item.image,
      });
    }
  }, [item, form]); //called whenever the item or form is changed.

  function onSubmit(data: ProductInputType) {
    //this function must handle the patch request.
    if (!item?._id) {
      return;
    }
    updateProduct(_id, data);
  }
  return (
    <>
      <div className="w-full h-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit(data))}
            className="space-y-4 flex flex-col gap-4 w-full h-fit"
          >
            <FormLabel>Add new Dish</FormLabel>
            <div className="flex gap-6">
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
                      <Input
                        type="price"
                        step="0.01"
                        placeholder="type price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cath.map((el) => (
                        <SelectItem value={el._id} key={el._id}>
                          {el.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
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
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div>
                      {preview ? (
                        <div className="overflow-hidden relative rounded-xl aspect-7/2">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <Button
                            onClick={() => {
                              setPreview(null);
                            }}
                            size={"icon"}
                            className="bg-white rounded-full z-99 absolute right-2 top-2"
                          >
                            <X color="black" />
                          </Button>
                        </div>
                      ) : (
                        <label className="block cursor-pointer w-full aspect-9/2 border-2 border-dashed rounded-2xl">
                          <div className=" flex flex-col items-center justify-center h-full w-full text-gray-400 bg-transparent">
                            Click to upload image
                            <Upload />
                          </div>
                          <input
                            className="text-transparent"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                          ></input>
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isUploading}>
              {isUploading ? "Creating" : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
