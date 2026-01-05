"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type itemType = {
    name: string;
    price: number;
    image: string;
    description: string;
    id: number;
};

type CartitemsType = itemType & {
    quantity: number;
};

interface CartContextType {
    cartItems: CartitemsType[];

    addToCart: (item: CartitemsType) => void;
    removeFromCart: (id: number) => void; //it removes the item by its id, and no return
    updateQuantity: (id: number, quantity: number) => void; // it updates the count by its id and number included.

    getTotalPrice: () => number;
    getTotalItems: () => number;

    setIsCartOpen: boolean;
    isCartOpen: (open: boolean) => void; //-> for toggling the drawer
}
//

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
        }
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
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotalItems,
                getTotalPrice,
                isCartOpen,
                setIsCartOpen,
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
