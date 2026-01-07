"use client";

//this component -> accepts food api and renders it into product jsx and dipslays it in itself.

import { itemType } from "@/context/CartContext";
import { ProductCard } from "./ProductCard";
import products from "@/data/products.json";

type ShelfType = {
  name: string;
  items: itemType[];
};

export function DisplayShelf({ name, items }: ShelfType) {
  return (
    <>
      <div>{name}</div>
      <div className="grid grid-cols-3 grid-rows-2 w-full max-w-7xl h-180 ">
        {items.map((el) => (
          <ProductCard
            key={el.id}
            id={el.id}
            name={el.name}
            image={el.image}
            description={el.description}
            price={el.price}
            quantity={0}
          ></ProductCard>
        ))}
      </div>
    </>
  );
}
