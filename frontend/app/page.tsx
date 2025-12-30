"use client";
import BaseStructucture from "../app/_components/BaseSctructure";
import { PromoBanner } from "./_components/PromoBanner";
import { DisplayShelf } from "./_components/DisplayShelf";
import { UserSidebar } from "./_components/UserSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function HomePage() {
  return (
    <BaseStructucture>
      
      <DisplayShelf></DisplayShelf>
      <DisplayShelf></DisplayShelf>
     
    </BaseStructucture>
  );
}
