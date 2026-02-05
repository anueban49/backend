"use client";
import { Intro } from "./_components/Intro";
import { CrudProvider } from "@/context/SSR-inventoryContext";
export default function Page() {
  return (
    <>
      <CrudProvider>
        <Intro />
      </CrudProvider>
    </>
  );
}
