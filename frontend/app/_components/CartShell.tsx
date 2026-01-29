"use client";
import { useEffect, useState } from "react";
//when user adds item, in other words, whenever the cart state is updated, there should be smol red dot indicating a change.
import { AppSideBar } from "./AppSideBar";
import { useCart } from "@/context/CartContext";
export function CartShell() {
  const { cartItems } = useCart();
  const [ring, setRing] = useState(false);
  useEffect(() => {
    setRing(true);
    console.log(cartItems);
    setRing(false)
  }, [cartItems])
  return (
    <>
    
      <AppSideBar />
    </>
  );
}
