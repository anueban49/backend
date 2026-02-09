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
  items: OrderItemType[];
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
  createOrderByClient: ({ items, userId }: OrderType) => Promise<OrderType>;
  updateOrder: () => Promise<void>;
  getAllOrdersforStaff: () => Promise<void>;
  getOrderByClient: () => Promise<void>;
}
import { toast } from "sonner";

export const OrderContext = createContext({} as OrderContextType);
export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [allOrders, setAllOrders] = useState<OrderType[]>([]);
  const [ordersByClient, setOrdersbyClient] = useState([]);
  const [loading, setLoading] = useState(false);

  const createOrderByClient = async ({ items, userId }: OrderType) => {
    // it uses authmiddleware, which checks and processes accesstoken.
    try {
      const res = await api.post(`/order/create/${userId}`, {
        items: items.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        status: "pending",
      });
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

  const getOrderByClient = async () => {};
  return (
    <OrderContext.Provider
      value={{
        allOrders,
        ordersByClient,
        createOrderByClient,
        getAllOrdersforStaff,
        getOrderByClient,
        updateOrder,
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
};
