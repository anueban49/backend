"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { itemType, CartitemsType } from "@/context/CartContext";

import { Plus } from "lucide-react";
import { useEffect } from "react";
import { AddToCart } from "./UserSidebar";

export function ProductCard(item: CartitemsType) {
  const { addToCart, cartItems } = useCart();
  // function handleAddtoCart({ ...item, item.quantity }: CartitemsType) {

  //   addToCart({
  //     ...item,
  //     quantity: 1,
  //   });

  // }
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full h-full rounded-2xl bg-white flex flex-col gap-2 p-4">
        <div className="bg-gray-500 rounded-2xl w-full h-full relative overflow-hidden">
          <Image alt="food" width={300} height={200} src={item.image} />

          <Button
            size="icon"
            className="aspect-square rounded-full absolute right-2 bottom-2 bg-white flex items-center justify-center "
            onClick={() => {
              addToCart(item)
            }}
          >
            <Plus color="red" />
          </Button>
        </div>
        <div className="flex justify-between font-medium">
          <h2 className="text-red-500">{item.name} </h2>{" "}
          <h2 className="text-black">$ {item.price}</h2>
        </div>
        <p>{item.description}</p>
        <p className="hidden">{item.id}</p>
      </div>
    </div>
  );
}
