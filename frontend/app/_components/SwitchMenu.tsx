"use client";
import React, { ReactNode, Children, useState } from "react";
import { nullish } from "zod";
import { Button } from "@/components/ui/button";
import { is } from "zod/v4/locales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const menuOptions = [
  { id: 1, name: "Cart" },
  { id: 2, name: "Order" },
];

export type cartItemtype = {
  image: string;
  name: string;
  description: string;
  price: number;
};
const CartItems = [];
//below should indicate the types of unit items INSIDE <CART> element; not the whole CART.
const CartItemsCard = (props: cartItemtype) => {
  return (
    <>
      <img src={props.image} alt={props.name} />
      <p>{props.name}</p>
      <p>{props.description}</p>
      <p>{props.price}</p>
    </>
  );
};
//below IS indicating wtf should cart menu button display
export type CartMenuDisplayType = {
  items: Array<cartItemtype> | undefined;
  deliveryLocation: string | undefined; //takes input
  paymentInfo: string | undefined; //takes input (for now)
};

//discovery: you can actually write element style as object and call the object later on the element, wtf. | irrelevant info[ignore]

function OptionMenuDisplay(props: CartMenuDisplayType) {
  return (
    <div className="flex flex-col w-full h-fit gap-3">
      <Card className="p-2">
        <CardHeader>My Cart</CardHeader>
        <CardContent>
          <p>Items in cart</p>
        </CardContent>
        <CardHeader>Delivery Location</CardHeader>
      </Card>
      <Card>
        <CardHeader>Payment Info</CardHeader>
      </Card>
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
  const [cart, setCart] = useState(null);

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
            <>
              <button
                style={isActive ? buttonStyle : {}}
                onClick={() => {
                  handleClick(option.id);
                }}
                key={option.id}
              >
                {option.name}
              </button>
            </>
          );
        })}
      </div>
      <div>
        {active === 1 && <OptionMenuDisplay></OptionMenuDisplay>}
        {active === 2 && <PaymentMenuDisplay></PaymentMenuDisplay>}
      </div>
    </>
  );
}
//plan: try making all menu options as array and map it into buttons -> ?

//plan2: const [cart, order] = usestate("order") -> if there's an item with "selected" status, other items will be removed from 'selected' status -. how to implement it
