"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSidebar, SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "./sidebar";
export function Cart() {

  return (
    <>
      <Button size="icon" className="rounded-full bg-white">
        <ShoppingCart color="black" size={20} />
      </Button>
    </>
  );
}
