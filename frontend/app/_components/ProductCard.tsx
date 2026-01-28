"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { itemType, CartitemsType } from "@/context/CartContext";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useIMcrud } from "@/context/SSR-inventoryContext";

export function ProductCard(item: CartitemsType) {
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState<itemType | null>(null);
  const [dialogQuantity, setDialogQuantity] = useState<number>(1);
  const { fetchProductbyID } = useIMcrud();

  const truncateText = (text: string[], limit: number) => {
    if (text.length >= limit) {
      return text.slice(0, limit);
    }
    return text;
  };
  const loadItemData = async (_id: string) => {
    const data = await fetchProductbyID(_id);
    setProduct(data);
  };
  const HandleAddToCart = () => {
    addToCart({ ...item, quantity: dialogQuantity });
  };
  return (
    <div className="flex p-4 ">
      <div className="w-full h-full rounded-xl bg-white flex flex-col gap-2 p-4">
        <div className="rounded-xl w-full aspect-5/3 relative overflow-hidden">
          <img src={item.image} className="w-full object-cover" />

          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  loadItemData(item.id);
                  setDialogQuantity(1); 
                }}
                size="icon"
                className="aspect-square rounded-full absolute right-2 bottom-2 bg-white flex items-center justify-center "
              >
                <Plus color="red" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="w-full h-fit aspect-2/1 grid grid-rows-1 grid-cols-2 gap-4 ">
                <div className="col-span-1 overflow-hidden rounded-xl">
                  <img
                    src={product?.image}
                    className="object-cover object-center aspect-square "
                    alt={product?.image}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-red-500 text-xl font-bold">
                      {item?.name}
                    </p>
                    <p className="text-[0.7em]">{product?.ingredients}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.7em]">Total Price </p>{" "}
                    <p className="font-bold">${item.price * dialogQuantity}</p>
                  </div>
                  <div className="absolute bottom-1/3 right-8 grid grid-cols-3 scale-90">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full scale-90 col-span-1"
                      onClick={() =>
                        setDialogQuantity(Math.max(1, dialogQuantity - 1))
                      }
                    >
                      <Minus />
                    </Button>
                    <div className="aspect-square col-span-1 flex items-center justify-center font-medium text-[1.25em]">
                      {dialogQuantity}
                    </div>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full scale-90 col-span-1"
                      onClick={() => setDialogQuantity(dialogQuantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      HandleAddToCart();
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between">
          <h2 className="text-red-500">{item.name} </h2>{" "}
          <h2 className="text-black">$ {item.price}</h2>
        </div>
        <p className="text-sm text-black">{item.ingredients}</p>

        <p className="hidden">{item.id}</p>
      </div>
    </div>
  );
}
