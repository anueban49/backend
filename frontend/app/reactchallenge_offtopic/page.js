"use client";

import { useEffect, useState } from "react";
import { CartContext, CartProvider, useCart } from "./CartContext";
const api = require("./mockapi.json");
import Button from '@components/ui/button'
export default function Testpage() {
  const [products, setProducts] = useState([]);
  setProducts(api);

  return (
    <>
      {" "}
      <CartProvider>
        <div className="w-screen h-screen">
          <div className="w-80 h-full bg-white">Cart section here</div>
          <div>
            {products.map((el, i) => {
              return (
                <>
                  <CartContext>
                    <div>{el.name}</div>
                    <div>{el.price} </div>
                    <div>{el.description}</div>
                    <Button></Button>
                  </CartContext>
                </>
              );
            })}
          </div>
        </div>
      </CartProvider>
    </>
  );
}
