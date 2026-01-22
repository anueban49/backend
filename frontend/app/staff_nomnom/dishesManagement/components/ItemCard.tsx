"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { UpdateDialog } from "./updateCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen, X } from "lucide-react";
import { CrudContext, useIMcrud, ProductType } from "../SSR-inventoryContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/lib/axios";

export function ItemCard(props: ProductType) {
  const [item, setItem] = useState<ProductType | null>(null);
  const [open, setOpen] = useState(false);
  const { product, fetchProductbyID } = useIMcrud();

  const getproductdata = async (_id: string) => {
    const { data } = await api.get<ProductType>(`/product/products/${_id}`);
    setItem(data);
  };

  return (
    <>
      <div
        key={props?._id}
        className="bg-white rounded-2xl shadow-md aspect-4/3 relative"
      >
        <CardContent className="w-full aspect-4/3 h-fit p-0 relative">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpen(true);
                  getproductdata(props._id);
                }}
                size={"icon"}
                className="absolute top-20 right-2 rounded-full"
                variant={"secondary"}
              >
                <Pen color="red" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <UpdateDialog key={props._id} _id={props._id} ></UpdateDialog>
            </DialogContent>
          </Dialog>

          <div className="w-full h-4/6 overflow-hidden">
            <img
              className="object-cover rounded-xl"
              src={props.image}
              alt={props.name}
            />
          </div>
          <div className="w-full p-2 flex flex-col ">
            <div className="p-0 text-sm flex flex-row gap-4 justify-between">
              <p>{props.name}</p>
              {props.price}
            </div>

            <CardDescription className="text-xs">
              {props.ingredients}
            </CardDescription>
          </div>
        </CardContent>
      </div>
    </>
  );
}
