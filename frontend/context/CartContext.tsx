"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type itemType = {
  name: string;
  price: number;
  image: string;
  description: string;
  id: number;
};

export type CartitemsType = itemType & {
  quantity: number;
};

export interface CartContextType {
  cartItems: CartitemsType[];

  addToCart: (item: CartitemsType) => void;
  removeFromCart: (id: number) => void; //it removes the item by its id, and no return
  updateQuantity: (id: number, quantity: number) => void; // it updates the count by its id and number included.

  getTotalPrice: () => number;
  getTotalItems: () => number;

  // setIsCartOpen: boolean;
  // isCartOpen: (open: boolean) => void; //-> for toggling the drawer // which is irrevalant considering that I'm going to use this component inside another component.
}
//1. User clicks "Add to Cart" → addToCart() updates context
//2.  User clicks cart icon → Drawer opens
//3. CartDrawer uses useCart() to get cartItems and renders them
//4. User can update quantities or remove items

//discovery: context itself can hold data

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartitemsType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartitemsType) => {
    setItems((prev) => {
      const itemExists = prev.find((i) => i.id === item.id);
      if (itemExists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    if (!id) {
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  const getTotalItems = () => {
    return items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        // isCartOpen,
        // setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("CartProvider must be used within cartContext");
  }
  return context;
};
