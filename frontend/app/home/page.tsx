"use client";
import BaseStructure from "../_components/BaseStructure";
import { PromoBanner } from "../_components/PromoBanner";
import { DisplayShelf } from "../_components/DisplayShelf";
import { UserSidebar } from "../_components/UserSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
export default function HomePage() {
  return (
    <>
      <DisplayShelf></DisplayShelf>
      <DisplayShelf></DisplayShelf>
    </>
  );
}
