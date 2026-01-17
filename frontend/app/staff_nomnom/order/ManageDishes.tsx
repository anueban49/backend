"use client";
import { ReactNode, Children, useState, useEffect, createContext } from "react";
import { useForm, useFormState, Watch } from "react-hook-form";
import { itemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { api } from "@/lib/axios";
//this is the main site for adding food to the database so staff schema is not necessarily constructed here so im moving this staff schema out
import { CreateNewDish } from "../addNewCard";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export type ProductType = {
    name: string;
    _id: string;
    timestamps: string;
    price: number;
    ingredients: string;
    image: string;
};
export type CategoryType = {
    name: string;
    _id: string;
};
export const DishesDashboard = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [cathData, setCathData] = useState<CategoryType[]>([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await api.get<ProductType[]>("product/products");
            setProducts(data);
            console.log(data);
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
            <div className="w-full bg-rose-50 h-full p-8 flex flex-col">
                <div className="flex flex-col gap-4">
                    {" "}
                    <p className="font-bold">Dishes Category</p>
                    <div className="">
                        {cathData.map((category) => (
                            <Button
                                key={category._id}
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
                                className="w-full h-full rounded-2xl flex flex-col items-center justify-center text-red-500"
                                variant={"outline"}
                                onClick={() => { }}
                            >
                                Add New Dish
                                <PlusCircle size={40} />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="h-125 p-8 flex flex-col gap-20">
                            <CreateNewDish className="absolute top-30"></CreateNewDish>
                        </DialogContent>
                    </Dialog>

                    {products.map((product) => {
                        return (
                            <Card key={product._id}>
                                <CardContent className="w-full h-full aspect-3/2 p-1">
                                    <img
                                        className="w-full h-3/5 rounded-2xl"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    <CardHeader>{product.name}</CardHeader>
                                    <CardDescription>
                                        {Array.isArray(product.ingredients)
                                            ? product.ingredients.join(", ")
                                            : product.ingredients}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
