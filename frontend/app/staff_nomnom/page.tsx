"use client";
//importing the backend, getting access keys % staff authorization form
// here should create the C, R, D operations ->
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
  id: string;
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
  const AddNewProduct = () => { };
}

export default function StaffDashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cathData, setCathData] = useState<CategoryType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get("http://localhost:4049/product/products");
      setProducts(data);
      if (data) {
        console.log("data found successfully");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getCathData = async () => {
      const res = await fetch("http://localhost:4049/category/categories");
      if (res) {
        console.log("category data fetched");
      }
      const cathData = await res.json();
      setCathData(cathData);
    };
    getCathData();
  }, []);
  return (
    <div className="w-screen h-screen bg-white flex ">
      <div className="w-80 h-full flex flex-col p-8 gap-4">
        <div>Logo</div>
        <div className=" flex flex-col gap-3">
          <Button className="rounded-full">Food Menu</Button>
          <Button className="rounded-full">Orders</Button>
        </div>
      </div>
      <div className="w-full bg-rose-50 h-full p-8 flex flex-col">
        <div>
          {" "}
          <p>Dishes Category</p>
          <div className="">
            {cathData.map((category) => (
              <Button key={category.id} variant={"outline"} className="m-2 scale-95 rounded-full">
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 p-4 gap-2">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent>
                <CardHeader>{product.name}</CardHeader>
                <CardDescription>{product.ingredients}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
