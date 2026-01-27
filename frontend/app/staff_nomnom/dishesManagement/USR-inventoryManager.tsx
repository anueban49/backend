//this component has to only work with products.
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateNew } from "../../_components/createNew";
import { useIMcrud, ProductType } from "../../../context/SSR-inventoryContext";
import { Pen, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CategoryType } from "../../../context/SSR-inventoryContext";
import { api } from "@/lib/axios";
import { ItemCard } from "../../_components/ItemCard";

export function InventoryManager() {
  const [cathData, setCathData] = useState<CategoryType[]>([]);
  const [selectedcategory, setSelectedcategory] = useState<
    CategoryType | "All"
  >("All");
  const {
    allProducts,
    products,
    categories,
    fetchAllProduct,
    fetchAllCategories,
    fetchProductsbyCategory,
  } = useIMcrud();

  useEffect(() => {
    fetchAllCategories();
  }, []);
  useEffect(() => {
    fetchAllProduct();
  }, []);
  const filterProducts = (_id: string, props: CategoryType) => {
    setSelectedcategory(props);
    fetchProductsbyCategory(_id);
  };
  return (
    <>
      <div className="w-screen h-screen bg-white flex ">
        <div className="w-full bg-rose-50 h-full p-8 flex flex-col">
          <div className="flex flex-col gap-4">
            {" "}
            <p className="font-bold">Dishes Category</p>
            <div className="">
              <Button
                variant={selectedcategory === "All" ? "default" : "outline"}
                className="m-2 scale-95 rounded-full"
                onClick={() => {
                  setSelectedcategory("All");
                }}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    selectedcategory === category ? "default" : "outline"
                  }
                  className="m-2 scale-95 rounded-full"
                  onClick={() => {
                    filterProducts(category._id, category);
                  }}
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

              <DialogContent className="h-125 p-8 flex flex-col gap-20 bg-white rounded-xl shadow-md ">
                <CreateNew></CreateNew>
              </DialogContent>
            </Dialog>

            {selectedcategory === "All" ? (
              <>
                {allProducts.map((product) => {
                  return (
                    <ItemCard
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      ingredients={product.ingredients}
                      image={product.image}
                      category={product.category}
                      timestamps={product.timestamps}
                      _id={product._id}
                    ></ItemCard>
                  );
                })}
              </>
            ) : (
              <>
                {products.map((product) => {
                  return (
                    <ItemCard
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      ingredients={product.ingredients}
                      image={product.image}
                      category={product.category}
                      timestamps={product.timestamps}
                      _id={product._id}
                    ></ItemCard>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
