"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export type ProductType = {
  name: string;
  image: string;
  price: number;
  description: string;
//   createdAt: Date;
//   updatedAt: Date;
//   attrs: string[];
};
// type productShelfProps = {
//     product: ProductType;
// }
import { Plus } from "lucide-react";

export function ProductCard( prop: ProductType) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full h-full rounded-2xl bg-white flex flex-col gap-2 p-4">
        <div className="bg-gray-500 rounded-2xl w-full h-full relative">
          <img
            className="w-full h-full object-center object-cover rounded-2xl"
            src={`${process.env.API_IMAGE_URL}${prop.image}`}
          />
          <Button className=" absolute right-2 bottom-2 bg-white rounded-full aspect-square p-0 flex itemc-center justify-center">
            <Plus color="red"/>
          </Button>
        </div>
        <div className="flex justify-between font-medium">
          <h2 className="text-red-500">{prop.name} </h2>{" "}
          <h2 className="text-black">$ {prop.price}</h2>
        </div>
        <p>{prop.description}</p>
      </div>
    </div>
  );
}
