"use client";
import { useState, useEffect } from "react";
import { PromoBanner } from "./PromoBanner";
import { Header } from "./Header";
import { Footer } from "./Footer";
export default function Homepage() {
  return (
    <>
      <div className="flex flex-col">
        {" "}
        <Header />
        <PromoBanner />
        <Footer/>
      </div>
    </>
  );
}
