"use client";
//importing the backend, getting access keys % staff authorization form
// here should create the C, R, D operations ->
//this opage mainly focuses on getting data, while add new data component will be on seperate file
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
//this is the main site for adding food to the database so staff schema is not necessarily constructed here so im moving this staff schema out

import { DishesDashboard } from "./order/ManageDishes";
import { Logo } from "../_components/Logo";
import { OrdersDashboard } from "./order/ManageOrders";
export type StaffType = {
  username: string;
  id: number;
};

export type ProductType = {
  name: string;
  id: string;
  timestamps: string;
  price: number;
  ingredients: string;
};
export type CategoryType = {
  name: string;
  _id: string;
};

interface staffDashboardType {
  staff: StaffType;
  //actions:
  AddNewProduct: (item: itemType) => void;
  DeleteProduct: (id: number) => void; //delete product by id
  UpdateProduct: (id: number) => void;
}

export const StaffContext = createContext<staffDashboardType>(
  {} as staffDashboardType
);

// function StaffProvider({ children }: { children: ReactNode }) {
//   const AddNewProduct = () => { };
// }
const operationBtns = [
  { id: 1, name: "Food Menu" },
  { id: 2, name: "Orders" },
];

export default function StaffDashboard() {
  const [active, setActive] = useState(1);
  const handleClick = (id: number) => {
    setActive(id);
  };
  return (
    <div className="w-screen h-screen bg-white flex ">
      <div className="w-80 h-full flex flex-col p-8 gap-4">
        <div className="bg-black"><Logo /></div>
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
      {active === 1 && <DishesDashboard></DishesDashboard>}
      {active === 2 && <OrdersDashboard></OrdersDashboard>}
    </div>
  );
}
