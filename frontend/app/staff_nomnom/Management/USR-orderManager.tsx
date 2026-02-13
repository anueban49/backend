"use client";
import { api } from "@/lib/axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCompleteInfoType } from "@/app/_components/AuthProvider";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { useOrder } from "@/app/_components/OrderContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
export const OrderManager = () => {
  const [invoices, setInvoices] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);
  const { getAllOrdersforStaff, allOrders } = useOrder();

  useEffect(() => {
    getAllOrdersforStaff();
    setInvoices(allOrders);
  }, []);

  const orderStatus = [
    "pending",
    "paid",
    "delivering",
    "completed",
    "cancelled",
  ];

  const UpdateStatus = async (status: string, _id: string) => {
    try {
      //takes order id to update status
      const res = await api.patch(`/order/${_id}`, {
        status: status,
      });
      toast.success("Status updated! wait for 1 second...");
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
  console.log(invoices);
  const ShowOrders = () => {
    return (
      <>
        {invoices.map((invoice: OrderType, index) => (
          <TableRow key={invoice._id} className="items-center">
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium flex flex-col">
              <p>{invoice.userId.email}</p>
              <p>{invoice.userId.username}</p>
            </TableCell>
            <TableCell>{invoice._id}</TableCell>
            <TableCell>
              {invoice.items &&
                Array.isArray(invoice.items) &&
                invoice.items.length}
            </TableCell>
            <TableCell className="">
              <p>
                {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </TableCell>
            <TableCell>
              <p>
                {invoice.items.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0,
                )}
              </p>
            </TableCell>
            <TableCell>
              {invoice.status !== "completed" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger suppressHydrationWarning className="p-0">
                    <span className="p-0">{invoice.status}</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
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
              ) : (
                <p className="text-gray-500">Completed</p>
              )}
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
              <TableHead>No.</TableHead>
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
