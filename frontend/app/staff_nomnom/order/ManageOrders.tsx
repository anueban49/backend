"use client";
import { api } from "@/lib/axios";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";

export type OrderType = {
    userId: string;
    items: string[];
    price: number;
    status: string;
    id: string;
};

export const OrdersDashboard = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        const getOrderData = async () => {
            try {
                const { data } = await api.get<OrderType[]>("order/orders");
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };
        getOrderData();
    }, []);
    return (
        <div>
            {orders.map((order) => {
                return <div key={order.id} className="w-full p-4 ">
                    <CheckboxItem>{order.status}</CheckboxItem>
                </div>;
            })}
        </div>
    );
};
