"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type itemType = {
  name: string;
  price: number;
  image: string;
  ingredients: string;
  id: string;
};

export type CartitemsType = itemType & {
  quantity: number;
};

interface CartContextType {
  cartItems: CartitemsType[];
  addToCart: (item: CartitemsType) => void;
  removeFromCart: (id: string) => void; //it removes the item by its id, and no return
  updateQuantity: (id: string, quantity: number) => void; // it updates the count by its id and number included.
  totalPrice: number;
  totalItemsQuantity: number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>(
  {} as CartContextType,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartitemsType[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItemsQuantity, setTotalItemsQuantity] = useState(0);

  //the comp passes item with quantity here
  const addToCart = (item: CartitemsType) => {
    setCartItems((prev) => {
      const itemExists = prev.find((i) => i.id === item.id);
      if (itemExists) {
        const updated = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    if (!id) {
      return;
    }
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  const clearCart = () => {
    setCartItems([]);
  };
  useEffect(() => {
    const price = getTotalPrice();
    const count = getTotalItems();
    setTotalPrice(price);
    setTotalItemsQuantity(count);
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
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
