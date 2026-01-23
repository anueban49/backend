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
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ProductType } from "../staff_nomnom/dishesManagement/SSR-inventoryContext";
import { ShoppingCart, X } from "lucide-react";
import { SwitchMenu } from "./SwitchMenu";
import { useCart, CartContext, CartProvider } from "@/context/CartContext";

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
  const toggleDrawer = () => {
    if (open) {setOpen(false)
      return setOpen(true);
    }
  }
  return (
    <Drawer direction="right" defaultOpen={false} >
      <DrawerTrigger asChild>
        <Button size={"icon"} variant="outline" className="rounded-full" onClick={toggleDrawer}>
          <ShoppingCart color="red" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-2xl p-4 z-99 bg-gray-200">
        <DrawerHeader className="w-full flex flex-row justify-between">
          <DrawerTitle className="text-black">Order Detail</DrawerTitle>
          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <X />
          </Button>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <SwitchMenu></SwitchMenu>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

//   <Sidebar
//     side="right"
//     variant="sidebar"
//     collapsible="offcanvas"
//     style={{
//       background: "transparent",
//     }}
//     className="overflow-hidden bg-zinc-600"
//   >
//     <SidebarContent className="bg-zinc-600 h-full">
//       <SidebarHeader>
//         <SidebarGroup className="flex flex-col gap-2">
//           <SidebarGroupLabel className="flex justify-between">
//             <ShoppingCart color="white" />
//             <p className="text-white">Order detail</p>
//             <Button
//               size="icon"
//               variant="outline"
//               className="rounded-full"
//               onClick={toggleSidebar}
//             >
//               <X />
//             </Button>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SwitchMenu></SwitchMenu>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarHeader>
//     </SidebarContent>
//   </Sidebar>
// );
