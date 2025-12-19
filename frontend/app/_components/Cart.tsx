'use client';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
export function Cart() {
    return (
        <Button className="rounded-full bg-white">
            <ShoppingCart color="black" size={20}/>
        </Button>
    )
}