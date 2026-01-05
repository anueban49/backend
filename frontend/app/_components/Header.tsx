"use client";

import { Logo } from "./Logo";
import { DeliveryAddress } from "./DeliveryAddress";
import { UserProfile } from "./User";
import { Cart } from "./Cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CartShell } from "./CartShell";

export function Header() {
  return (
    <div className="w-screen h-[3em] bg-gray-900 flex items-center p-4 gap-4 z-99">
      <Logo />
      <DeliveryAddress />
      <UserProfile />
      <CartShell />
    </div>
  );
}
