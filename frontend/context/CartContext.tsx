"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type FooditemType = {
  name: string;
  price: number;
  image: string;
  ingredients: string;
  _id: string;
};

export type CartitemsType = FooditemType & {
  quantity: number;
};

interface CartContextType {
  cart: CartitemsType[];
  addToCart: (item: CartitemsType) => void;
  removeFromCart: (id: string) => void; //it removes the item by its id, and no return
  updateQuantity: (id: string, newQuantity: number) => void; // it updates the count by its id and number included.
  totalPrice: number;
  totalItemsQuantity: number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartitemsType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemsQuantity, setTotalItemsQuantity] = useState(0);

  useEffect(() => {
    const price = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalPrice(price);
    setTotalItemsQuantity(count);
  }, [cart]);
  //the comp passes item with quantity here
  const addToCart = (item: CartitemsType) => {
    setCart((prev) => {
      const itemExists = prev.find((i) => i._id === item._id);
      if (itemExists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    if (!id) {
      return;
    }
    setCart((prev) => prev.filter((item) => item._id !== id));
  };
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item)),
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        totalItemsQuantity,
        clearCart,
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
