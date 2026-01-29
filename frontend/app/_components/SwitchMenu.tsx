"use client";
import React, { ReactNode, Children, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartContext,
  CartProvider,
  useCart,
  CartitemsType,
  itemType,
} from "@/context/CartContext";
import { useAuth } from "./AuthProvider";
import { Minus, Plus, X } from "lucide-react";
//Cart display has to render items, and their total price and total item counts.
//while order has to do with history of orders, order status et cetera/.
const menuOptions = [
  { id: 1, name: "Cart" },
  { id: 2, name: "Order" },
];

//below should indicate the types of unit items INSIDE <CART> element; not the whole CART.

//below IS indicating wtf should cart menu button display
export type CartMenuDisplayType = {
  items: Array<CartitemsType> | undefined;
  deliveryLocation: string | undefined; //takes input
  total: number | 0;
};

//discovery: you can actually write element style as object and call the object later on the element, wtf. | irrelevant info[ignore]
function totalPriceDisplay(items: CartitemsType) {
  const { getTotalItems, getTotalPrice, cartItems } = useCart();
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  console.log(user)

  const totalPrice = getTotalPrice();
  console.log(totalPrice);
  return (
    <>
      <div>$ {totalPrice}</div>
    </>
  );
}

export function CartItemsDisplay() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  console.log("cartIems", cartItems);

  return (
    <div className="w-full h-full ">
      {cartItems.length > 0 ? (
        <div>
          <Card className="p-2 gap-0 max-h-2/3 relative overflow-scroll">
            <CardHeader className="p-2 text-[15px] font-bold">
              My Cart
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-4 aspect-square overflow-scroll">
              {cartItems.map((item) => (
                <div className="flex flex-col items-center">
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
                      <CardDescription className="font-[0.7em] w-full px-2 overflow-scroll h-2/5">
                        {item.ingredients}
                      </CardDescription>
                      <div className="w-full flex justify-between items-center">
                        <p className="text-black font-bold px-2">
                          {item.quantity >= 1
                            ? item.price * item.quantity
                            : item.price}
                        </p>
                        <div className="flex items-center justify-center">
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={() => {
                              if ((item.quantity = 0)) {
                                removeFromCart(item.id);
                              }
                              item.quantity = item.quantity - 1;
                              updateQuantity(item.id, item.quantity);
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
                              console.log(cartItems);
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

function PaymentMenuDisplay() {
  return (
    <>
      <Card></Card>
    </>
  );
}
export function SwitchMenu() {
  const [active, setActive] = useState(1);

  const buttonStyle = {
    backgroundColor: active ? "red" : "white",
    color: active ? "white" : "black",
    borderRadius: "20px",
  };
  const handleClick = (id: number) => {
    setActive(id);
  };

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
      <Card>
        <CardTitle className="px-4">Delivery Location</CardTitle>
      </Card>
      <Card className="w-full aspect-5/3">
        <CardTitle className="px-4">Payment Info</CardTitle>
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-600">Items</p>
            <h2 className="font-bold ">$</h2>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-600">Shipping</p>
            <h2 className="font-bold ">$0.99</h2>
          </div>
          <p className="text-gray-400">
            _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
          </p>
          <div className="w-full flex justify-between items-center">
            <p className="text-gray-600 text-md">Total</p>
            <h2 className="font-bold text-xl">$</h2>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

//plan2: const [cart, order] = usestate("order") -> if there's an item with "selected" status, other items will be removed from 'selected' status -. how to implement it
