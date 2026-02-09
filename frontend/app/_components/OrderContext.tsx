"use client";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
export type OrderProviderProps = {
  children: ReactNode;
};
export type OrderType = {
  _id: string;
  userId: UserCompleteInfoType;
  items: OrderItemType[] | OrderItemType;
  status: string;
  createdAt: string;
  updatedAt: string;
};
export interface OrderResponseType {
  orders: OrderType;
}
export type OrderItemType = {
  _id: string;
  quantity: number;
  price: number;
};
import { UserCompleteInfoType } from "./AuthProvider";
import { api } from "@/lib/axios";
export interface OrderContextType {
  allOrders: OrderType[];
  ordersByClient: OrderType | OrderType[];
  createOrderByClient: () => Promise<void>;
  updateOrder: () => Promise<void>;
  getAllOrdersforStaff: () => Promise<void>;
  getOrderByCLient: () => Promise<void>;
}

export const OrderContext = createContext({} as OrderContextType);
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [allOrders, setAllOrders] = useState<OrderType | null>(null);
  const [ordersByClient, setOrdersbyClient] = useState([]);
  const [loading, setLoading] = useState(false);

  const createOrderByClient = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
      try {
        const res = await api.get("/")
    } catch (error) {}
  };

  const updateOrder = async () => {};

  const getAllOrdersforStaff = async () => {
    const token = localStorage.getItem("staffAccessToken");
    if (!token) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get<OrderResponseType>("/order/all");
      setAllOrders(data);
    } catch (error) {}
  };

  const getOrderByCLient = async () => {};
  return (
    <OrderContext.Provider
      value={{
        allOrders,
        getAllOrdersforStaff,
        getOrderByCLient,
        updateOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
