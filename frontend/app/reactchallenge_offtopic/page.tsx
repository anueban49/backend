"use client";
import { Card } from "@/components/ui/card";
import products from "@/data/mockapi.json";
import { Button } from "@/components/ui/button";
import { createContext, useContext, useState, Children, ReactNode } from "react";
//custom cartcontext & usecart component will be needed.
//cartcontext will have to pass the item name and price as its context, and cartprovider will have to allow save & delete the items in the cart;
//adding usecart hook will allow the context to be passed -> the context will have to be passed to sidebar, sessionstorage as long as the user is within the session (logged in | active).

//context:
type itemType = {
  name: string;
  price: number;
  image: string;
  description: string;
  id: number;
};

type CartitemsType = itemType & {
  quantity: number;
}

interface CartContextType {
  //state
  cartItems: CartitemsType[];
  //actions
  addToCart: (item: CartitemsType) => void;
  removeFromCart: (id: number) => void; //it removes the item by its id, and no return
  updateQuantity: (id: number, quantity: number) => void; // it updates the count by its id and number included.
  //computed values
  getTotalPrice: () => number;
  getTotalItems: () => number;
  //ui states
  setIsCartOpen: boolean;
  isCartOpen: (open: boolean) => void; //-> for toggling the drawer
}
//
//{} as CartContextType is a type assertion to satisfy TypeScript when no default value exists (provider must supply the real value).
export const CartContext = createContext<CartContextType>({} as CartContextType);
// You must tell TypeScript what the context value looks like.
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartitemsType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartitemsType) => {
    setItems((prev) => {
      const itemExists = prev.find((i) => i.id === item.id);
      if (itemExists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    //if item.id === i.id; proceed filtering it.
    if (!id) { return; }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    }
  }
  const getTotalItems = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""))
      return total + price + item.quantity;
    }, 0);
  }
  const getTotalPrice = (price: CartitemsType) => {
    return items.reduce((total, item) => total + item.price, 0);
  }



  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        setIsCartOpen,
        isCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) { throw new Error("CartProvider must be used within cartContext") }
  return context;
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
            <Button >Add to Cart</Button>
          </Card>
        ))}
      </div>
    </>
  );
}
