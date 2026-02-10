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
  _id: string; //order ID
  userId: UserCompleteInfoType;
  items: OrderItemType[];
  status: string;
  createdAt: string;
  updatedAt: string;
}; //for getting a
export interface OrderResponseType {
  orders: OrderType[];
}
export type OrderItemType = {
  _id: string;
  quantity: number;
  price: number;
};
export type OrderPlaceType = {
  userId: string;
  items: itemType[];
  status: string;
};
import { CartitemsType } from "@/context/CartContext";
import { UserCompleteInfoType } from "./AuthProvider";
import { api } from "@/lib/axios";
export interface OrderContextType {
  allOrders: OrderType[];
  ordersByClient: OrderType[];
  createOrderByClient: (data: CartitemsType[], _id: string) => Promise<void>;
  updateOrder: () => Promise<void>;
  getAllOrdersforStaff: () => Promise<void>;
  getOrderByClient: (userId: string) => Promise<void>;
  deleteOrderByClient: (orderId: string) => Promise<void>;
  refreshOrderByClient: (userId: string) => Promise<void>;
}
import { toast } from "sonner";
import { itemType } from "@/context/CartContext";

export const OrderContext = createContext({} as OrderContextType);
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [allOrders, setAllOrders] = useState<OrderType[]>([]);
  const [ordersByClient, setOrdersbyClient] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);

  const createOrderByClient = async (data: CartitemsType[], _id: string) => {
    // it uses authmiddleware, which checks and processes accesstoken.
    try {
      const res = await api.post(`/order/create/${_id}`, {
        userId: _id,
        data: data.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        status: "pending",
      });
      console.log(res);
      toast.success(`Order has been successfully placed!`);

      //on successful order placing, we need to close the sidebar.
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async () => {};

  const getAllOrdersforStaff = async () => {
    const token = localStorage.getItem("staffAccessToken");
    try {
      setLoading(true);
      const { data } = await api.get<OrderResponseType>("/order/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(data)) {
        setAllOrders(data);
      } else if (data.orders && Array.isArray(data.orders)) {
        setAllOrders(data.orders);
      } else {
        console.error("Unexpected data format:", data);
        setAllOrders([]);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderByClient = async (userId: string) => {
    if (!userId) {
      return;
    }
    try {
      const { data } = await api.get<OrderResponseType>(`/order/${userId}`);

      setOrdersbyClient(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOrderByClient = async (orderId: string) => {
    try {
      const res = await api.delete(`/order/${orderId}`);
      console.log("sent order id", orderId);
      console.log("Order deleted:", res);
    } catch (error) {
      console.error(error);
    }
  };
  const refreshOrderByClient = async (userId: string) => {
    try {
      const { data } = await api.get<OrderResponseType>(`/order/${userId}`);
      setOrdersbyClient(data.orders);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };
  return (
    <OrderContext.Provider
      value={{
        allOrders,
        ordersByClient,
        createOrderByClient,
        getAllOrdersforStaff,
        getOrderByClient,
        updateOrder,
        deleteOrderByClient,
        refreshOrderByClient,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("context must be used within the designated provider");
  }
  return context;
};
