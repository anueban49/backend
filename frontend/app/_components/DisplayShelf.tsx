"use client";
//this has to work with only one category types at the time.

import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import {
  useIMcrud,
  ProductType,
  CategoryType,
} from "../../context/SSR-inventoryContext";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/axios";
interface DisplayShelfProps {
  _id: string;
  name: string;
}
//this is a component when given category id, it fetches all the item belongs to that category.
export function DisplayShelf(props: DisplayShelfProps) {
  const { fetchProductsbyCategory, products } = useIMcrud();
  const [items, setItems] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchProductsbyCategory(props._id);
  }, []);

  return (
    <>
      {loading ? (
        <div className="p-4 flex items-start">
          <Skeleton className="w-[250] h-4"></Skeleton>
          <div className="grid grid-cols-3 grid-rows-2 max-w-7xl  w-full h-180 ">
            {products.map((el) => {
              return (
                <ProductCard
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  description={el.ingredients}
                  price={el.price}
                  quantity={0}
                ></ProductCard>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full text-white max-w-7xl p-4 text-xl">
            {props.name}
          </div>
          <div className="grid grid-cols-3 grid-rows-2 max-w-7xl  w-full h-180 ">
            {products.map((el) => {
              return (
                <ProductCard
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  description={el.ingredients}
                  price={el.price}
                  quantity={0}
                ></ProductCard>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
