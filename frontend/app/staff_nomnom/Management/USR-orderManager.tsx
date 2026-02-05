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
interface OrderResponseType {
  orders: OrderType;
}
type OrderItemType = {
  _id: string;
  quantity: number;
  price: number;
};
export const OrderManager = () => {
  const [invoices, setInvoices] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<UserCompleteInfoType[]>([]);

  useEffect(() => {
    const getOrderData = async () => {
      const token = localStorage.getItem("accesstoken");
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
  }, []);
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
  return (
    <>
      {loading ? (
        <>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
          <Skeleton></Skeleton>
        </>
      ) : (
        <>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>

                <TableHead>Price</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell className="font-medium flex flex-col">
                    {invoice.userId.email}
                  </TableCell>
                  <TableCell>{invoice._id}</TableCell>
                  <TableCell>
                    {invoice.items
                      ? invoice.items.length
                      : invoice.items.quantity}
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
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
