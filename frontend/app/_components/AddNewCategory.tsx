"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useIMcrud } from "@/context/SSR-inventoryContext";
type Categorytype = {
  name: string;
};
//it's small form for creating new catergory.
//once the value is passed, it should save its when uploading to db.
export function AddNewCategory() {
  const [isCreating, setIsCreating] = useState(false);
  //using axios api to patch/put datas of category to backend
  const { categories} = useIMcrud();
  const totalCats = categories.length
  const onsubmit = async (data: Categorytype) => {
    setIsCreating(true);
    try {
      const res = await api.post("category/categories/create", {
        name: data.name,
      });
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };
  const form = useForm<Categorytype>({
    defaultValues: {
      name: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col gap-2"
        >
          <FormLabel>Create new category</FormLabel>
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                    className="w-80"
                      placeholder={`Add to total ${totalCats} categories...`}
                      {...field}
                      disabled={isCreating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
