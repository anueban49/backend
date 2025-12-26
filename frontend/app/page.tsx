"use client";
import BaseStructucture from "../app/_components/BaseSctructure";
import { PromoBanner } from "./_components/PromoBanner";
import { DisplayShelf } from "./_components/DisplayShelf";
import { UserSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function HomePage() {
  return (
    <BaseStructucture>
      <div>this a test</div>
      <DisplayShelf></DisplayShelf>
      <DisplayShelf></DisplayShelf>
      <SidebarProvider><UserSidebar></UserSidebar></SidebarProvider>
    </BaseStructucture>
  );
}
