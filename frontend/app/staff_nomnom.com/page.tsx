"use client";
//importing the backend, getting access keys % staff authorization form
// here should create the C, R, D operations ->
import { ReactNode, Children, useState, useEffect, createContext } from "react";
import { itemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";
//this is the main site for adding food to the database so staff schema is not necessarily constructed here so im moving this staff schema out

export type StaffType = {
  username: string;
  id: number;
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

function StaffProvider({ children }: { children: ReactNode }) {
    const AddNewProduct = () => {

    }
}

export default function staffDashboard() {
    useEffect(() => {}, [])
  return (
    <div className="flex flex-col px-10">
      <div>Manager Dashboard under construction</div>
      <div className="grid grid-cols-5">
        <p>Dishes</p>
      </div>
      <Button
        className="w-fit p-4"
        size={"default"}
        onClick={() => {
          AddNewProduct();
        }}
      >
        Add new dish
      </Button>
    </div>
  );
}
