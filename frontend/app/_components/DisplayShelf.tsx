"use client";

//this component -> accepts food api and renders it into product jsx and dipslays it in itself.

import { itemType } from "@/context/CartContext";
import { ProductCard } from "./ProductCard";
import products from "@/data/products.json";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import {
  CrudProvider,
  CrudContext,
  useIMcrud,
  ProductType,
} from "../staff_nomnom/dishesManagement/SSR-inventoryContext";

type ShelfType = {
  name: string;
};

export function DisplayShelf(props: ShelfType) {
  const { allProducts, fetchAllProduct } = useIMcrud();
  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);
  return (
    <>
      <div>{props.name}</div>
      <div className="grid grid-cols-3 grid-rows-2 w-full max-w-7xl h-180 ">
        {allProducts.map((el) => {
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
