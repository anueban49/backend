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
import { Upload, X } from "lucide-react";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const CLOUD_NAME = process.env.CLOUDINARY_CN;
const UPLOAD_PRESET = "dishImages";

export function CreateNewDish() {
  //this here is just a <CreateNewDish> COMPONENT. its a COMPONENT, not the ACTUAL function.
  const [cath, setCath] = useState<CategoryType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [method, setMethod] = useState("");
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
      image: "",
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the 5MB limit");
        setFile(null);
        setPreview(null);
      }
      if (!file.type.startsWith("image/")) {
        setError("Please select images only");
      }

      setFile(file);
      setPreview(URL.createObjectURL(file));
      await fileUpload(file);
    }
  };

  const fileUpload = async (file: File) => {
    if (!file) return;
    setisUploading(true);
    setError(null);
    setMethod("FormData (raw file)");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
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
        setError(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisUploading(false);
    }
  };
  const editProduct = async (id: string, data: any) => {
    try {
      const res = await api.patch(`/product/products/${id}`, data);
      console.log("updated", res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/product/products/${id}`);
      console.log("deleted", res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (data: CreatenewType) => {
    if (!data.image) {
      console.log("image needed");
    }

    try {
      const response = await api.post("product/products/create", {
        name: data.name,
        price: parseFloat(data.price),
        ingredients: data.ingredients,
        category: data.category,
        image: {
          url: data.image,
          publicId: "",
        }, //it should be url, string now
      });
      console.log("created product:", response);
      form.reset();
      setPreview(null);
      setUploadedUrl(null);
      setFile(null);
      setError(null);
      if (!response) {
        console.log("uploading failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisUploading(false);
    }
  };

  const resetUpload = () => {
    setPreview(null);
    setUploadedUrl(null);
    setFile(null);
    form.setValue("image", "");
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
