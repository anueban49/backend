'use client';
//importing the backend, getting access keys % staff authorization form
// here should create the C, R, D operations ->
import { ReactNode, Children, useState, useEffect, createContext } from "react";
import { ProductType } from "../_components/ProductCard";
//this is the main site for adding food to the database so staff schema is not necessarily constructed here so im moving this staff schema out

export type StaffType = {
    username: string;
    id: number;
}

interface staffDashboardType {

    staff: StaffType;
    //actions:
    AddNewProduct: (item: ProductType) => void;
    DeleteProduct: (id: number) => void; //delete product by id
    UpdateProduct: (id: number) => void;
}


export const StaffContext = createContext<staffDashboardType>({} as staffDashboardType);

function StaffProvider({ children }: { children: ReactNode }) {

}

export default function staffDashboard() {
    return (
        <>
            Manager Dashboard under construction
        </>
    )
}