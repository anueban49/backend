"use client";
//on click to add item (+) -> it should pass the price, name, description parameter and display it as list on the side bar
//udner the hood-> should calculate the total price
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardAction, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductType } from "../../context/SSR-inventoryContext";
import { Bell, HandPlatter, ShoppingCart, X } from "lucide-react";
import { SwitchMenu } from "./SwitchMenu";
import { useCart, CartContext, CartProvider } from "@/context/CartContext";
import { Dot } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
const cart: ProductType[] = [];

interface AddToCartProps {
  product: ProductType; // Pass entire product
}

export function AddToCart({ product }: AddToCartProps) {
  cart.push(product);
  console.log("Added to cart:", product);
  return cart;
}
//this has to only design the component of sidebar.
export function AppSideBar() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [notify, setNotify] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (cartItems === null || []) {
      setNotify(false);
    } else {
      return setNotify(true);
    }
  }, [cartItems]);
  return (
    <Drawer
      direction="right"
      defaultOpen={false}
      onOpenChange={() => {
        setNotify(false);
      }}
    >
      {notify === true ? (
        <div className="notifDot z-99 w-3.5 aspect-square bg-red-500 rounded-full absolute top-3 right-3"></div>
      ) : (
        <></>
      )}

      <DrawerTrigger asChild>
        <Button
          size={"icon"}
          variant="outline"
          className="rounded-full relative p-0"
          onClick={() => {
            setOpen(true);
          }}
        >
          <ShoppingCart color="red" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="rounded-2xl py-4 z-99 bg-neutral-700">
        <DrawerHeader className="w-full flex flex-row justify-between">
          <DrawerTitle className="text-white flex gap-4">
            <ShoppingCart color="white" />
            Order Detail
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="outline" size={"icon"} className="rounded-full">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          {user ? (
            <SwitchMenu></SwitchMenu>
          ) : (
            <Card className="px-4 h-100 flex flex-col justify-between">
              <CardTitle>You haven't registered</CardTitle>
              <CardContent className="p-0 flex flex-col justify-center items-center gap-4 ">
                Sign up today to order your favourite dish!
                <HandPlatter />
              </CardContent>
              <CardAction className="w-full flex justify-center">
                <Button onClick={() => {router.push('/user')}}>Register</Button>
              </CardAction>
            </Card>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
