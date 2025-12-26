"use client";
//on click to add item (+) -> it should pass the price, name, description parameter and display it as list on the side bar
//udner the hood-> should calculate the total price
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ProductType } from "./ProductCard";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingCart,
  X,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

let cart: ProductType[] = [];

const items = [
  {
    title: "Order detail",
    url: "#",
    icon: ShoppingCart,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

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
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="right" variant="floating">
        <p>sidebar is {state}</p>
        <SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="flex justify-between">
                <ShoppingCart />
                Order detail
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
                  <Switch className="w-full">Cart Order</Switch>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </SidebarHeader>
      </Sidebar>
    </SidebarProvider>
  );
}
