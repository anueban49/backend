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
import { CreateNewDish } from "./addNewCard";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const AddNewProduct = () => {};
}

export default function StaffDashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cathData, setCathData] = useState<CategoryType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get<ProductType[]>("product/products");
      setProducts(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getCathData = async () => {
      const { data } = await api.get<CategoryType[]>("/category/categories");
      setCathData(data);
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
        <div className="flex flex-col gap-4">
          {" "}
          <p className="font-bold">Dishes Category</p>
          <div className="">
            {cathData.map((category) => (
              <Button
                key={category.id}
                variant={"outline"}
                className="m-2 scale-95 rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 p-4 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-40 h-40 rounded-2xl flex flex-col items-center justify-center text-red-500"
                variant={"outline"}
                onClick={() => {}}
              >
                Add New Dish
                <PlusCircle size={40} />
              </Button>
            </DialogTrigger>

            <DialogContent className="h-125 p-8 flex flex-col gap-20">
              {" "}
              <DialogHeader className="">
                <DialogTitle>Create a new dish</DialogTitle>
              </DialogHeader>
              <CreateNewDish className="absolute top-30"></CreateNewDish>
            </DialogContent>
          </Dialog>

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
