"use client";
import { useState, useEffect, Children } from "react";
import { PromoBanner } from "./PromoBanner";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";

type BaseSctructureProps = {
  children: React.ReactNode;
};
export default function Homepage({ children }: BaseSctructureProps) {
  return (
    <>
      <div className="flex flex-col">
        {" "}
        <Header />
        <PromoBanner />
        {children}
        <Footer />
      </div>
    </>
  );
}
