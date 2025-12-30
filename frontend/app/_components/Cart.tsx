"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useSidebar} from "@/components/ui/sidebar";

export function Cart() {
 const {toggleSidebar} = useSidebar();
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
