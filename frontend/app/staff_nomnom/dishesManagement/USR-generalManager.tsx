"use client";
//this comp has to display the layout for the landing page.
import { ReactNode, Children, useState, useEffect, createContext } from "react";
import { itemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { api } from "@/lib/axios";


import { InventoryManager } from "./USR-inventoryManager";
import { Logo } from "@/app/_components/Logo";
import { OrdersDashboard } from "../order/ManageOrders";
import { Settings } from "../order/Settings";

const operationBtns = [
  { id: 1, name: "Food Menu" },
  { id: 2, name: "Orders" },
  { id: 3, name: "Settings" },
];

export function USRgeneralManager() {
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
      {active === 2 && <OrdersDashboard></OrdersDashboard>}
      {active === 3 && <Settings></Settings>}
    </div>
  );
}
