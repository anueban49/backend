"use client";
import { useState, useEffect, Children } from "react";
import { PromoBanner } from "./PromoBanner";
import { Header } from "./Header";
import { Footer } from "./Footer";

type BaseSctructureProps = {
  children: React.ReactNode;
};
export default function BaseStructure({ children }: BaseSctructureProps) {
  return (
    <>
      <div className="flex flex-col">
        {" "}
        <Header />
        <PromoBanner />
        <div className="px-10 flex flex-col items-center">{children}</div>
        <Footer />
      </div>
    </>
  );
}
