//this component has to only work with products.
"use client";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { CreateNew } from "./components/createNew";
import { CrudContext, useIMcrud } from "./SSR-inventoryContext";
import { Pen, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CategoryType } from "../page";
import { api } from "@/lib/axios";
export function InventoryManager() {
  const [cathData, setCathData] = useState<CategoryType[]>([]);

  const {
    product,
    allProducts,
    fetchAllProduct,
    fetchProductbyID,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useIMcrud();
  useEffect(() => {
    const getCathData = async () => {
      const { data } = await api.get<CategoryType[]>("/category/categories");
      setCathData(data);
    };
    getCathData();
  }, []);
  return (
    <>
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
                <CreateNew></CreateNew>
              </DialogContent>
            </Dialog>

            {allProducts.map((product) => {
              return (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-md aspect-4/3 "
                >
                  <CardContent className="w-full aspect-4/3 h-fit p-0 relative">
                    <Button
                    onClick={() => {}}
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
                        {product.ingredients}
                      </CardDescription>
                    </div>
                  </CardContent>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
