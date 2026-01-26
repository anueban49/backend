"use client";
import { ReactNode, Children, useState, useEffect, createContext } from "react";
import { useForm, useFormState, Watch } from "react-hook-form";
import { itemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { api } from "@/lib/axios";
//this is the main site for adding food to the database so staff schema is not necessarily constructed here so im moving this staff schema out
import { CreateNewDish } from "../CRUDitemCard";
import { Pen, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useIMcrud } from "../dishesManagement/SSR-inventoryContext";

export type ProductType = {
  name: string;
  _id: string;
  timestamps: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
};
export type CategoryType = {
  name: string;
  _id: string;
};
export const DishesDashboard = () => {
  const {
    product,
    allProducts,
    categories,
    fetchAllCategories,
    fetchCategoryByID,
    updateProduct,
    deleteProduct,
    createProduct,
    fetchAllProduct,
    fetchProductbyID,
  } = useIMcrud();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cathData, setCathData] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetchAllProduct();
  }, []);
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div className="w-screen h-screen bg-white flex ">
      <div className="w-full bg-rose-50 h-full p-8 flex flex-col">
        <div className="flex flex-col gap-4">
          {" "}
          <p className="font-bold">Dishes Category</p>
          <div className="">
            {cathData.map((category) => (
              <Button
                key={category._id}
                variant={"outline"}
                className="m-2 scale-95 rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full aspect-4/1 grid grid-cols-4 p-4 gap-4 ">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="w-full aspect-4/3 p-10 rounded-2xl flex flex-col items-center justify-center text-red-500 border-dashed border-1 border-red-300">
                Add New Dish
                <PlusCircle size={40} />
              </Card>
            </DialogTrigger>

            <DialogContent className="h-125 p-8 flex flex-col gap-20">
              <CreateNewDish></CreateNewDish>
            </DialogContent>
          </Dialog>

          {products.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md aspect-4/3 "
              >
                <CardContent className="w-full aspect-4/3 h-fit p-0 relative">
                  <Button
                    size={"icon"}
                    className="absolute top-20 right-2 rounded-full"
                    variant={"secondary"}
                  >
                    <Pen color="red" />
                  </Button>
                  <div className="w-full h-4/6 overflow-hidden">
                    <img
                      className="object-cover rounded-xl"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="w-full p-2 flex flex-col ">
                    <div className="p-0 text-sm flex flex-row gap-4 justify-between">
                      <p>{product.name}</p>
                      {product.price}
                    </div>

                    <CardDescription className="text-xs">
                      {truncateText(product.ingredients, 20)}
                    </CardDescription>
                  </div>
                </CardContent>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
