"use client";
import {
  createContext,
  useContext,
  ReactNode,
  Children,
  useState,
  useEffect,
  use,
} from "react";

const Cart = [];

export const CartContext = createContext(null);

export const CartProvider = ({ children: ReactNode }) => {
  const addToCart = (item, quantity) => {
    const itemExists = Cart.find((i) => i.id !== item.id);
    if (itemExists) {
      itemExists.quantity += 1;
    }
    return Cart.push((prev) => [...prev, item]);
  };
  const removeFromCart = (item, id) => {
    const multipleItem = Cart.find((i) => i.quantity > 1);
    if (multipleItem) {
        item.quantity -= 1;
    }
    return Cart.filter((i) => i.id !== item.id )
  };
  const updateCart = () => {};
  const totalItems = () => {};
  const totalPrice = () => {};
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Context muts be used within the provider");
  }
  return context;
};

// useEffect to fetch mock API
//custom use hook will be needed
