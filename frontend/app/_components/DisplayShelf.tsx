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
  CategoryType,
} from "../staff_nomnom/dishesManagement/SSR-inventoryContext";

type ShelfType = {
  name: string;
  _id: string;
};

export function DisplayShelf(props: ShelfType) {
  const { fetchProductsbyCategory } = useIMcrud();

  // useEffect(() => {
  //   const loadData = async (_id: ShelfType) => {
  //     try {
  //       const res = fetchProductsbyCategory(props._id);
  //       console.log(res);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //     loadData;
  //   };
  // }, [props._id]);
  useEffect(() => {
    console.log(fetchProductsbyCategory)
  })
  // useEffect(() => {
  //   const loadProducts = async (props._id) => {
  //     try {
  //       await fetchProductsbyCategory(props._id);
  //     } catch (error) {
  //       console.error("Failed to fetch products for category:", error);
  //     }
  //   };
  //   loadProducts();
  // }, [props._id]);

  return (
    <>
      <div className="w-full">{props.name}</div>
      <div className="grid grid-cols-3 grid-rows-2 max-w-7xl  w-full h-180 ">
        {productsbyid.map((el) => {
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
