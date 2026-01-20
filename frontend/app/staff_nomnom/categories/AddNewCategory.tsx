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

type Categorytype = {
  name: string;
};
//it's small form for creating new catergory.
//once the value is passed, it should save its when uploading to db.
export function AddNewCategory() {
  const [isCreating, setIsCreating] = useState(false);
  //using axios api to patch/put datas of category to backend
  const onsubmit = async (data: Categorytype) => {
    setIsCreating(true);
    try {
      const res = await api.post("category/categories/create", {
        name: data.name,
      });
      console.log(res.data);
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
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <FormLabel>Add new category</FormLabel>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                  placeholder="type category name..." {...field} 
                  disabled={isCreating}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isCreating}>
            {isCreating ? "Adding..." : "Add"}
          </Button>
        </form>
      </Form>
    </>
  );
}
