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
import { createNewSchema } from "../schemas/CreateNewSchema";
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
} from "../../context/SSR-inventoryContext";
import { id } from "zod/v4/locales";
import { toast } from "sonner";
interface UpdateDialogProp {
  _id: string;
}
//firt, it fetches data of the item by id.
//second, it displays the data on the form as its default value
//onsubmit, it patches the data.
export function UpdateDialog({ _id }: UpdateDialogProp) {
  const {
    updateProduct,
    fetchProductbyID,
    fetchAllCategories,
    categories,
    product,
  } = useIMcrud();
  const [open, setopen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // the image will be url.
  const [isUploading, setIsUploading] = useState(false);
  const [item, setItem] = useState<ProductType | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductbyID(_id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (_id) {
      fetchData();
    }
  }, [_id]);

  useEffect(() => {
    fetchAllCategories();
  }, []);
  const form = useForm<z.infer<typeof createNewSchema>>({
    resolver: zodResolver(createNewSchema) as any,
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
        name: item?.name,
        price: item?.price,
        ingredients: item?.ingredients,
        category:
          typeof item?.category === "string"
            ? item?.category
            : item?.category._id,
        image: item?.image,
      });
    }
    if (item?.image) {
      setPreview(item?.image);
    }
  }, [item, form]); //called whenever the item or form is changed.

  function onSubmit(data: z.infer<typeof createNewSchema>) {
    //this function must handle the patch request.
    if (!_id) {
      return;
    }
    try {
      setUpdating(true);
      const categoryObj = categories.find((c) => c._id === data.category);
      if (!categoryObj) return;
      const inputData: ProductInputType = {
        name: data.name,
        price: data.price,
        ingredients: data.ingredients,
        category: categoryObj,
        image: data.image,
      };
      setUpdating(false);
      updateProduct(_id, inputData);
      console.log("updated item:", _id, inputData);
      toast.success("Update success!")
    } catch (error) {
      setUpdating(false);
      console.error(error);
    } finally {
      setUpdating(false);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds the 5MB limit");
        setFile(null);
        setPreview(null);
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please choose image files only");
      }
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setFile(file);
      setPreview(URL.createObjectURL(file));
      await fileUpload(file);
    }
  };
  const fileUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dishImages");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dbicloi01/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(data.secure_url);
        form.setValue("image", data.secure_url);
        console.log("upload success:", data.secure_url);
      } else {
        console.error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="w-full h-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-4 w-full h-fit"
          >
            <FormLabel>Update Dish</FormLabel>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dish Name</FormLabel>
                    <FormControl>
                      <Input placeholder={`${product?.name}`} {...field} />
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
                        type="number"
                        step="0.01"
                        placeholder={`${product?.price}`}
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
                      placeholder={`${product?.ingredients}`}
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
                        <SelectValue placeholder={`${product?.category}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((el) => (
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

            <Button
              className="w-full"
              type="submit"
              disabled={isUploading && updating}
            >
              {isUploading ? "Uploading image..." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
