"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart, CartitemsType } from "@/context/CartContext";
import { useAuth, UserCompleteInfoType } from "./AuthProvider";
import { DollarSignIcon, MapPin, Minus, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { OrderType, useOrder } from "./OrderContext";
import { DialogDescription } from "@radix-ui/react-dialog";
//Cart display has to render items, and their total price and total item counts.
//while order has to do with history of orders, order status et cetera/.
const menuOptions = [
  { id: 1, name: "Cart" },
  { id: 2, name: "Order" },
];

//below should indicate the types of unit items INSIDE <CART> element; not the whole CART.

//below IS indicating wtf should cart menu button display

//discovery: you can actually write element style as object and call the object later on the element, wtf. | irrelevant info[ignore]

export function SwitchMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [active, setActive] = useState(1);
  const {
    createOrderByClient,
    getOrderByClient,
    ordersByClient,
    deleteOrderByClient,
  } = useOrder();
  const [orderHistory, setOrderHistory] = useState<OrderType[]>([]);
  const {
    cartItems,
    totalItemsQuantity,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const buttonStyle = {
    backgroundColor: active ? "red" : "white",
    color: active ? "white" : "black",
    borderRadius: "20px",
  };
  const handleClick = (id: number) => {
    setActive(id);
  };

  function CartItemsDisplay() {
    return (
      <div className="w-full h-full ">
        {cartItems.length > 0 ? (
          <div>
            <Card className="p-2 gap-0 max-h-2/3 relative overflow-scroll no-scrollbar">
              <CardHeader className="p-2 text-[15px] font-bold">
                My Cart
              </CardHeader>
              <CardContent className="p-0 flex flex-col gap-4 aspect-square overflow-scroll no-scrollbar">
                {cartItems.map((item, index) => (
                  <div className="flex flex-col items-center" key={index + 1}>
                    <Card
                      key={item.id}
                      className="border-b border-dashed w-full aspect-3/1 overflow-hidden gap-0 p-0 bg-white rounded-2xl flex flex-row border-transparent shadow-none"
                    >
                      <CardContent className="w-1/3 p-0 aspect-square">
                        <img
                          src={item.image}
                          className=" w-full h-full p-1 rounded-xl object-cover object-center"
                        />
                      </CardContent>
                      <CardContent className="p-0">
                        <CardHeader className="px-2 py-0 flex justify-between items-center">
                          <p className="text-red-500 font-bold">{item.name}</p>
                          <Button
                            onClick={() => {
                              removeFromCart(item.id);
                            }}
                            size={"icon"}
                            className="rounded-full scale-95"
                            variant={"outline"}
                          >
                            <X color="red" />
                          </Button>
                        </CardHeader>
                        <CardDescription className="font-[0.7em] w-full px-2 overflow-scroll h-2/5 no-scrollbar">
                          {item.ingredients}
                        </CardDescription>
                        <div className="w-full flex justify-between items-center">
                          <p className="text-black font-bold px-2">
                            {(item.quantity * item.price).toFixed(2)}
                          </p>
                          <div className="flex items-center justify-center">
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              onClick={() => {
                                if (item.quantity === 0) {
                                  removeFromCart(item.id);
                                }

                                updateQuantity(item.id, item.quantity - 1);
                              }}
                            >
                              <Minus />
                            </Button>
                            <p>{item.quantity}</p>
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              <Plus />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <p className="text-gray-400">
                      _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="rounded-2xl w-full aspect-4/3 p-4 flex flex-col items-center justify-center text-3xl text-gray-300 bg-white">
            Cart is Empty
          </div>
        )}
      </div>
    );
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getOrderByClient(user?._id as string);
    setLoading(false);
  }, [user?._id, getOrderByClient]);
  //getting order history belonged to userId.
  function PaymentMenuDisplay() {
    const { user } = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = async (orderId: string) => {
      await deleteOrderByClient(orderId);
    };
    return (
      <>
        <Card>
          <CardHeader>Order History</CardHeader>
          <CardContent className="flex flex-col gap-4">
            {loading ? (
              <div className="w-full aspect-square text-2xl text-gray-400 flex justify-center items-center">
                Loading...
              </div>
            ) : (
              <>
                {ordersByClient.map((pastOrder) => (
                  <Card key={pastOrder._id} className="p-2 gap-2 ">
                    <div className="flex gap-2 justify-between">
                      <div className="text-sm text-gray-500 flex gap-2">
                        {new Date(pastOrder.updatedAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        <p>Items: {pastOrder.items.length}</p>
                      </div>

                      <p className="text-sm text-gray-500">
                        {pastOrder.status === "paid"
                          ? "In delivery"
                          : pastOrder.status}
                      </p>
                    </div>

                    {pastOrder.status === "pending" && (
                      <div className="flex justify-between">
                        <Button
                          size={"xs"}
                          className="bg-green rounded-2xl p-2 "
                          variant={"outline"}
                        >
                          <DollarSignIcon color="green" />
                          <p className="text-green-700">Pending Payment</p>
                        </Button>
                        <Button
                          size={"xs"}
                          className="bg-red rounded-2xl p-2 "
                          variant={"outline"}
                        >
                          Cancel Order
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </>
    );
  }
  function DeliveryLocationDisplay() {
    const { user } = useAuth();
    const address = Object.values(user?.address || {}).join(", ");
    const displayAddress = address.split(", ").slice(0, 5).join(", ");

    return (
      <Card className="gap-2">
        <CardTitle className="px-4 flex gap-2 items-center">
          <MapPin />
          Delivery Location:
        </CardTitle>
        <CardContent className="text-sm text-gray-500">
          {user?.address ? (
            displayAddress
          ) : (
            <span className="hover:underline" onClick={() => {}}>
              No Address Set
            </span>
          )}
        </CardContent>
      </Card>
    );
  }

  const billing: number = 0.99 + totalPrice;
  function handleCheckout() {
    createOrderByClient(cartItems, user?._id as string);
    clearCart();
    getOrderByClient(user?._id as string);
  }
  function PaymentInfoDisplay() {
    const { user } = useAuth();
    return (
      <Card className="w-full aspect-5/3">
        <CardTitle className="px-4">Payment Info</CardTitle>

        <CardContent className="flex flex-col gap-2 p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-600">Items</p>
            <h2 className="font-bold ">
              ${cartItems.length === 0 ? <p>-</p> : totalPrice}
            </h2>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-600">Shipping</p>
            <h2 className="font-bold flex">
              ${cartItems.length === 0 ? <p>-</p> : <p>0.99</p>}
            </h2>
          </div>
          <p className="text-gray-400">
            _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
          </p>
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-600 text-md">Total</p>
            <h2 className="font-bold text-xl flex">
              ${cartItems.length === 0 ? <p>-</p> : billing}
            </h2>
          </div>
        </CardContent>

        <CardFooter>
          {cartItems.length > 0 && (
            <Button
              className="bg-red-500 w-full rounded-xl"
              onClick={() => {
                handleCheckout();
              }}
            >
              Checkout
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full p-1 h-8 rounded-4xl bg-white grid grid-cols-2 grid-rows-1">
        {menuOptions.map((option) => {
          const isActive = active === option.id;
          return (
            <button
              key={option.id}
              style={isActive ? buttonStyle : {}}
              onClick={() => {
                handleClick(option.id);
              }}
            >
              {option.name}
            </button>
          );
        })}
      </div>
      <div>
        {active === 1 && <CartItemsDisplay></CartItemsDisplay>}
        {active === 2 && <PaymentMenuDisplay></PaymentMenuDisplay>}
      </div>

      <DeliveryLocationDisplay />
      <PaymentInfoDisplay />
    </div>
  );
}

//plan2: const [cart, order] = usestate("order") -> if there's an item with "selected" status, other items will be removed from 'selected' status -. how to implement it
