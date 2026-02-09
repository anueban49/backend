"use client";
import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCompleteInfoType } from "@/app/_components/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHead,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import { itemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
export const OrderManager = () => {
  const [invoices, setInvoices] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  const [clients, setClients] = useState<UserCompleteInfoType[]>([]);

  useEffect(() => {
    const getOrderData = async () => {
      const token = localStorage.getItem("staffAccessToken");
      try {
        setLoading(true);
        const { data } = await api.get<OrderResponseType>("/order/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("orders:", data);
        if (Array.isArray(data)) {
          setInvoices(data);
        } else if (data.orders && Array.isArray(data.orders)) {
          setInvoices(data.orders);
        } else {
          console.error("Unexpected data format:", data);
          setInvoices([]);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getOrderData();
    //for unit client info
    //plan is getting the email data everytime the order sends userID
  }, [1500]);
  const calcPriceOfOrders = (item: OrderItemType) => {
    if (item._id) {
      const total: number = item.price * item.quantity;
      return total;
    }
  };
  const orderStatus = [
    "pending",
    "paid",
    "delivering",
    "completed",
    "cancelled",
  ];

  const UpdateStatus = async (status: string, _id: string) => {
    console.log("status", status);
    try {
      //takes order id to update status
      const res = await api.patch(`/order/${_id}`, {
        status: status,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const LoadingScreen = () => {
    return (
      <>
        {Array.from({ length: 12 }).map((_, index) => (
          <TableRow key={index} className="gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <TableCell className=" p-2" key={index}>
                <Skeleton className="bg-gray-300 h-5" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  };
  const ShowOrders = () => {
    return (
      <>
        {invoices.map((invoice: OrderType) => (
          <TableRow key={invoice._id} className="items-center">
            <TableCell className="font-medium flex flex-col">
              {invoice.userId.email}
            </TableCell>
            <TableCell>{invoice._id}</TableCell>
            <TableCell>
              {invoice.items &&
                (Array.isArray(invoice.items) ? invoice.items.length : 0)}
            </TableCell>
            <TableCell className="flex flex-col gap-2">
              <p>
                {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </TableCell>
            <TableCell className="text-right">
              {invoice.items && Array.isArray(invoice.items)
                ? invoice.items.reduce(
                    (total, item) =>
                      total + (item.quantity || 0) * (item.price || 0),
                    0,
                  )
                : 0}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-0">
                  <Button variant={"ghost"} className="p-0">
                    {invoice.status}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {" "}
                  {orderStatus.map((status, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => {
                        UpdateStatus(status, invoice._id);
                      }}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="w-full p-4">
        <Table className="w-full p-4">
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{loading ? <LoadingScreen /> : <ShowOrders />}</TableBody>
        </Table>
      </div>
    </>
  );
};
