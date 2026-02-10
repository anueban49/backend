"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { itemType, CartitemsType } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductType, useIMcrud } from "@/context/SSR-inventoryContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "./AuthProvider";
import { Suggestion } from "./Suggestion";

export function ProductCard(item: CartitemsType) {
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState<ProductType>();
  const [dialogQuantity, setDialogQuantity] = useState<number>(1);
  const { fetchProductbyID } = useIMcrud();
  const { user } = useAuth();

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
    toast.success(
      `Successfully added ${dialogQuantity} ${item.name}('s) to Cart!`,
    );
  };
  return (
    <>
      <Card className="w-full p-2 gap-2 ">
        <CardContent className="relative p-2 w-full h-2/3 overflow-hidden rounded-2xl">
          <img
            src={item.image}
            className="rounded-xl w-full aspect-4/3 object-center object-cover"
          />{" "}
          <Dialog>
            <DialogTitle />
            <DialogTrigger asChild>
              {user ? (
                <Button
                  onClick={() => {
                    loadItemData(item.id);
                    setDialogQuantity(1);
                  }}
                  size="icon"
                  className="scale-120 aspect-square rounded-full absolute right-4 bottom-4 bg-white flex items-center justify-center "
                >
                  <Plus color="red" />
                </Button>
              ) : (
                <Suggestion />
              )}
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
                    <DialogHeader className="text-red-500 text-xl font-bold">
                      {item?.name}
                    </DialogHeader>
                    <DialogDescription className="text-[0.7em]">
                      {product?.ingredients}
                    </DialogDescription>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.7em]">Price </p>{" "}
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
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          HandleAddToCart();
                        }}
                        type="button"
                      >
                        Add To Cart
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardContent className="h-1/3 p-0">
          <CardHeader className="flex justify-between px-2 py-0">
            <p className="text-red-500 font-bold text-xl ">{item.name}</p>
            <p className="text-black font-medium text-xl ">${item.price}</p>
          </CardHeader>
          <CardDescription className="px-2 py-0 no-scrollbar">
            {item.ingredients}
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
