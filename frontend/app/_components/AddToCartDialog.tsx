"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductType, useIMcrud } from "@/context/SSR-inventoryContext";
import { useEffect, useState } from "react";

export function AddToCartDialog(_id: string) {
  // console.log(_id) id pass confirmed.
  const { fetchProductbyID, product } = useIMcrud();
  const [item, setItem] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProductbyID(_id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (_id) {
      fetchData();
    }
  }, [_id]);
  if (item) {console.log("item found")}
  return (
    <>
      <div className="w-full aspect-2/1 grid grid-rows-1 grid-cols-2">
        <div className="col-span-1 bg-gary-300">
          <img src={item?.image} className="object-cover" alt={item?.image} />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-red-500 text-xl font-bold">{item?.name}</p>
            <p className="text-[0.7em]">{item?.ingredients}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[0.7em]">Total Price</p>{" "}
            <p className="font-bold">${item?.price}</p>
          </div>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </>
  );
}
