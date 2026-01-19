"use client";

//this component -> accepts food api and renders it into product jsx and dipslays it in itself.

import { itemType } from "@/context/CartContext";
import { ProductCard } from "./ProductCard";
import products from "@/data/products.json";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

type ShelfType = {
  name: string;
};

export function DisplayShelf(props: ShelfType) {
  const [items, setItems] = useState<itemType[]>([]);
  useEffect(() => {
    const getDate = async () => {
      try {
        const { data } = await api.get<itemType[]>("product/products");
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
  return (
    <>
      <div>{props.name}</div>
      <div className="grid grid-cols-3 grid-rows-2 w-full max-w-7xl h-180 ">
        {items.map((el) => {
          return (
            <ProductCard
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              description={el.description}
              price={el.price}
              quantity={0}
            ></ProductCard>
          );
        })}
      </div>
    </>
  );
}
