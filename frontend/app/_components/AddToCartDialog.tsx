"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { ProductType, useIMcrud } from "@/context/SSR-inventoryContext";
import { useEffect, useState } from "react";

export function AddToCartDialog(_id: string) {
  // console.log(_id) id pass confirmed.
  const { fetchProductbyID } = useIMcrud();
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
  if (item) {
    console.log("item found");
  }
  return (
    <>
      <div className="w-full aspect-2/1 grid grid-rows-1 grid-cols-2">
        <div className="col-span-1 bg-gary-300">
          <Image
            width={100}
            height={200}
            src={item?.image as string}
            alt={item?.name as string}
          />
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
