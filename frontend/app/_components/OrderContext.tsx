"use client";
import { useState, useEffect, createContext, useContext } from "react";


interface OrderContextType {
    updateOrder: () => Promise<void>;
    
}

const OrderContext = createContext(null)