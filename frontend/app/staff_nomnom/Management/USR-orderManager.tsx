"use client";
import { api } from "@/lib/axios";
import { useState, useEffect } from "react";

export type OrderType = {
  userId: string;
  items: string[];
  status: string;
  _id: string;
  timestamp: string;
};

export const OrderManager = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const { data } = await api.get<OrderType[]>("/order/all");
        setOrders(data);
        console.log("orders:", data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrderData();
  }, []);
  return (
    <>
      {orders.map((item) => (
        <div>{item.items}</div>
      ))}
    </>
  );
};
