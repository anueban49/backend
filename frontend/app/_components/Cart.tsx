"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

export function Cart() {
  const { toggleSidebar } = useSidebar();
  return (
    <>

        <Button
          size="icon"
          className="rounded-full bg-white"
          onClick={toggleSidebar}
        >
          <ShoppingCart color="black" size={20} />
        </Button>

    </>
  );
}

//header -> contain trigger button; but layout has to have the cartcontext