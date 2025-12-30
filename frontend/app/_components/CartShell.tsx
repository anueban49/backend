'use client'
import { useSidebar, SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "./sidebar";
import { Cart } from "./Cart";
export function CartShell() {
    return (
        <>
        <SidebarProvider defaultOpen={false}>
            <Cart/>
            <UserSidebar/>
        </SidebarProvider>
        </>
    )
}