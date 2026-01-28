"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { itemType, CartitemsType } from "@/context/CartContext";

import { Plus } from "lucide-react";
import { useEffect } from "react";
import { AddToCart } from "./AppSideBar";
import { AddToCartDialog } from "./AddToCartDialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export function ProductCard(item: CartitemsType) {
  const { addToCart, cartItems } = useCart();
  const truncateText = (text: string[], limit: number) => {
    if (text.length >= limit) {
      return text.slice(0, limit);
    }
    return text;
  };
  return (
    <div className="flex p-4 ">
      <div className="w-full h-full rounded-xl bg-white flex flex-col gap-2 p-4">
        <div className="rounded-xl w-full aspect-5/3 relative overflow-hidden">
          <img src={item.image} className="w-full object-cover" />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                className="aspect-square rounded-full absolute right-2 bottom-2 bg-white flex items-center justify-center "

              >
                <Plus color="red" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddToCartDialog _id={ item.id} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between">
          <h2 className="text-red-500">{item.name} </h2>{" "}
          <h2 className="text-black">$ {item.price}</h2>
        </div>
        <p className="text-sm">{truncateText(item.description, 10)}</p>
        {/* <p className="text-sm">{item.description}</p> */}
        <p className="hidden">{item.id}</p>
      </div>
    </div>
  );
}
