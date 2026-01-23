"use client";
import {
  useSidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSideBar } from "./AppSideBar";
import { Cart } from "./Cart";
import { Button } from "@/components/ui/button";
import App from "next/app";
import { ReactNode, Children } from "react";
export function CartShell() {
  return (
    <>
    <AppSideBar/>
      {/* <SidebarProvider defaultOpen={false}>
        <AppSideBar />
        <main className="absolute top-2 right-4">
          <Cart/>
        </main>
      </SidebarProvider> */}
    </>
  );
}
