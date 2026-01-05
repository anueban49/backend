"use client";
import { useSidebar, SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "./UserSidebar";
import { Cart } from "./Cart";
export function CartShell() {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <header className="absolute top-2 right-4">
          <Cart />
        </header>
        <UserSidebar />
      </SidebarProvider>
    </>
  );
}
