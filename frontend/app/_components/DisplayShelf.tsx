"use client";

//this component -> accepts food api and renders it into product jsx and dipslays it in itself.

import { ProductType }from "./ProductCard";
import { ProductCard } from "./ProductCard";
import { useContext, useState, useEffect } from "react";
import products from "@/data/products.json";
type productShelfProps = {
  product: ProductType,
}

export function DisplayShelf() {

  return <div className="grid grid-cols-3 grid-rows-2 w-full max-w-7xl h-180 ">
    {products.map((el) =>(
      <ProductCard 
      name={el.name}
      image={el.image}
      description={el.description}
      price={el.price}
      ></ProductCard>
    ))}
  </div>;
}
