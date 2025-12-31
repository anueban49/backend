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
import { Button } from "@/components/ui/button";
import { ProductType } from "./ProductCard";
import { ShoppingCart, X } from "lucide-react";
import { SwitchMenu } from "./SwitchMenu";

const cart: ProductType[] = [];

interface AddToCartProps {
  product: ProductType; // Pass entire product
}

export function AddToCart({ product }: AddToCartProps) {
  cart.push(product);
  console.log("Added to cart:", product);
  return cart;
}
//plan:
//add close button to sidebar header -> implement collapse function
export function UserSidebar() {
  const { state, toggleSidebar } = useSidebar();
  return (
    <Sidebar
      side="right"
      variant="sidebar"
      collapsible="offcanvas"
      style={{
        background:"transparent"
      }}
      className="overflow-hidden bg-zinc-600"
    >
      <SidebarContent className="bg-zinc-600 h-full">
        <SidebarHeader >
          
            <SidebarGroup className="flex flex-col gap-2">
              <SidebarGroupLabel className="flex justify-between">
                <ShoppingCart color="white"/>
                <p className="text-white">Order detail</p>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={toggleSidebar}
                >
                  <X />
                </Button>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SwitchMenu></SwitchMenu>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          
        </SidebarHeader>
     </SidebarContent>
    </Sidebar>
  );
}
