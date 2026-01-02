"use client";
import { Card } from "@/components/ui/card";
import { AddToCart } from "../_components/UserSidebar";
import products from "@/data/mockapi.json";
import { Button } from "@/components/ui/button";
import { createContext, useContext, useState, Children } from "react";
//custom cartcontext & usecart component will be needed.
//cartcontext will have to pass the item name and price as its context, and cartprovider will have to allow save & delete the items in the cart;
//adding usecart hook will allow the context to be passed -> the context will have to be passed to sidebar, sessionstorage as long as the user is within the session (logged in | active).

//context:
type itemType = {
  name: string;
  price: number;
  id: number;
  quantity: number; 
};
interface CartContextType {
    cartItems: itemType;
    addToCart: () => void;
    removeFromCart: () => void;
    updateQuantity: () => void;
    getTotalPrice: () => void;
    getTotalItems: () => void;
}
//
//{ } as CartContextType is a type assertion to satisfy TypeScript when no default value exists (provider must supply the real value).
export const CartContext = createContext<CartContextType>({} as CartContextType);
// You must tell TypeScript what the context value looks like.
export const CartProvider = ({ id, name, price }: itemType) => {
  const [items, setItems] = useState<itemType[]>([]);

  const addToCart = (item: itemType) => {
    setItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearTheCart = () => {
    setItems([]);
  };
  //this has to include all the operation within cart, apparently.

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, clearTheCart, useCart }}
    >
      {Children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

};

function addItemToCart() {
  const clientCart = {};
  sessionStorage.setItem("cartItems", JSON.stringify(clientCart));
}

export default function offTopicPage() {
  return (
    <>
      <div>
        {products.map((el, i) => (
          <Card key={i}>
            {el.name}
            {el.price}
            <Button onClick={AddToCart(el.price)}>Add to Cart</Button>
          </Card>
        ))}
      </div>
    </>
  );
}
