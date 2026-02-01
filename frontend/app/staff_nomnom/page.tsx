"use client";
//this comp has to display the layout for the landing page.
import { ReactNode, Children, useState, useEffect, createContext } from "react";
import { itemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

import { InventoryManager } from "./Management/USR-inventoryManager";
import { OrderManager } from "./Management/USR-orderManager";
import { Settings } from "./Management/USR-settings";
import { Logo } from "@/app/_components/Logo";

const operationBtns = [
  { id: 1, name: "Food Menu" },
  { id: 2, name: "Orders" },
  { id: 3, name: "Settings" },
];

export default function USRgeneralManager() {
  const [active, setActive] = useState(1);
  const handleClick = (id: number) => {
    setActive(id);
  };
  return (
    <div className="w-screen h-screen bg-white flex ">
      <div className="w-80 min-w-80 h-full flex flex-col p-8 gap-4">
        <div className="bg-black">
          <Logo />
        </div>
        <div className=" flex flex-col gap-3">
          {operationBtns.map((btn) => {
            const isActive = active === btn.id;
            return (
              <Button
                onClick={() => {
                  handleClick(btn.id);
                }}
                variant={isActive ? "default" : "outline"}
                className="rounded-full"
                key={btn.id}
              >
                {btn.name}
              </Button>
            );
          })}
        </div>
      </div>
      {active === 1 && <InventoryManager></InventoryManager>}
      {active === 2 && <OrderManager></OrderManager>}
      {active === 3 && <Settings></Settings>}
    </div>
  );
}
