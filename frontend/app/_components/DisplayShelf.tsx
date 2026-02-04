"use client";
//this has to work with only one category types at the time.

import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import {
  useIMcrud,
  ProductType,
} from "../../context/SSR-inventoryContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface DisplayShelfProps {
  _id: string;
  name: string;
}
//this is a component when given category id, it fetches all the item belongs to that category.
export function DisplayShelf(props: DisplayShelfProps) {
  const { fetchProductsbyCategory } = useIMcrud();
  const [items, setItems] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await fetchProductsbyCategory(props._id);
      setItems(data);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full ">
        {loading ? (
          <div className="w-full flex flex-col gap-4">
            <Skeleton className="title w-[250] h-5 bg-gray-400 "></Skeleton>
            <div className="grid grid-cols-3 grid-rows-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card
                  key={index}
                  className="w-full overflow-hidden bg-gray-600 border-gray-600 p-0 gap-0"
                >
                  <CardContent className="p-4">
                    <Skeleton className="aspect w-full bg-gray-400" />
                  </CardContent>
                  <CardDescription className="flex flex-col px-4 gap-2">
                    <Skeleton className="h-6 w-2/3 bg-gray-400" />
                    <Skeleton className="h-8 w-full bg-gray-400" />
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="w-full text-white text-2xl p-4">{props.name}</h1>

            <div className="grid grid-cols-3 grid-rows-2  w-full lg:px-16 lg:gap-10 gap-4 p-4">
              {items.map((el) => {
                return (
                  <ProductCard
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    ingredients={el.ingredients}
                    price={el.price}
                    quantity={0}
                  ></ProductCard>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
