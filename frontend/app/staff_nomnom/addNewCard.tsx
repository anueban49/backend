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
import { api } from "@/lib/axios";
import { CategoryType } from "./page";
import { createNewSchema, CreatenewType } from "./CreateNewSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { File, FileInput, X } from "lucide-react";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
export function CreateNewDish() {
  //this here is just a <CreateNewDish> COMPONENT. its a COMPONENT, not the ACTUAL function.
  const [cath, setCath] = useState<CategoryType[]>([]);
  const [isUploading, setisUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof createNewSchema>>({
    resolver: zodResolver(createNewSchema),
    mode: "onSubmit",
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

  const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setisUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dvpt3lv6t/image/upload`,
        {
          method: "POST",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.error?.message || "Unknown error"}`);
        return;
      }
      const data = await res.json();
      console.log("uploaded:", data.secure_url);
      const setUploadedimgURL = data.url;
      form.setValue("image", setUploadedimgURL);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: CreatenewType) => {
    if (!data.image) {
      console.log("image needed");
    }
    setisUploading(true);
    const base64Image = await convertToBase64(data.image);
    console.log(base64Image)
    try {
      const response = await api.post("product/products/create", {
        name: data.name,
        price: parseFloat(data.price),
        ingredients: data.ingredients,
        category: data.category,
        image: base64Image,
      });
      console.log(response);
      form.reset();
      setPreview(null);
      if (!response) {
        console.log("uploading failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisUploading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="w-full aspect-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                        <div className="overflow-hidden relative rounded-xl aspect-7/2">
                          <input
                            className="w-full h-full flex flex-col align-center justify-center text-white border-solid border-2 rounded-2xl"
                            type="file"
                              accept="image/*"
                              onChange={fileUpload}
                            // onChange={(e) => {
                            //   const file = e.target.files?.[0];
                            //   if (file) {
                            //     const reader = new FileReader();
                            //     reader.onloadend = () => {
                            //       setPreview(reader.result as string);
                            //     };
                            //     reader.readAsDataURL(file);

                            //     field.onChange(file);
                            //   }
                            // }}
                          ></input>
                        </div>
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
