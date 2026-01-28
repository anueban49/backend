"use client";
import React, { ReactNode, Children, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  CartContext,
  CartProvider,
  useCart,
  CartitemsType,
  itemType,
} from "@/context/CartContext";
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
  const getTotalPrice = useCart();
  const totalPrice = getTotalPrice(items);
  return (
    <>
      <div>$ {totalPrice}</div>
    </>
  );
}

export function CartItemsDisplay(items: CartitemsType) {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCart();
console.log('cartIems', cartItems);
  return (
    <div className="w-full h-full">
      {cartItems.length > 0 ? (
        <div id="cartitemsDisplay" className="flex flex-col gap-4 py-2">
          {cartItems.map((item, index) => (
            <div key={item.id} className="grid grid-cols-3 p-1 bg-white rounded-2xl gap-2">
              <img
                src={item.image}
                className="aspect-square object-cover rounded-xl"
              />
              <div className="px-2 col-span-2">
                <p className="text-red-500 font-bold">{item.name}</p>
                <p className="font-[0.7em]">{item.ingredients}</p>
                <div>{item.price}</div>
                <p>Count: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4">Cart is Empty</div>
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
    <>
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
    </>
  );
}

//plan2: const [cart, order] = usestate("order") -> if there's an item with "selected" status, other items will be removed from 'selected' status -. how to implement it
