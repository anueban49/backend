"use client";
//this has to work with only one category types at the time.

import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import {
  useIMcrud,
  ProductType,
  CategoryType,
} from "../../context/SSR-inventoryContext";
import { api } from "@/lib/axios";
interface DisplayShelfProps {
  _id: string;
  name: string;
}
//this is a component when given category id, it fetches all the item belongs to that category.
export function DisplayShelf(props: DisplayShelfProps) {
  const { fetchProductsbyCategory, products } = useIMcrud();
  const [items, setItems] = useState<ProductType[]>([]);
  useEffect(() => {
    fetchProductsbyCategory(props._id);
    console.log(products)
  }, [props._id]);

  return (
    <>
      <div className="w-full">{props.name}</div>
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
    </>
  );
}
