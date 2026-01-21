"use client";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { useForm, Form } from "react-hook-form";
import { api } from "@/lib/axios";
//when clicked on the btn, dialog appears, containing the information of the entity. and user will edit it and send it to patch request
const CrudContext = createContext(null);

const CrudProvider = ({ children }: { children: ReactNode }) => {
  const updateProduct = async (id: string, data: any) => {
    try {
      const res = api.patch(`/product/products/${id}`);

    } catch(error){console.error(error)}
  }
  const deleteProduct = (id: string) => {
    try {
  const res = await api.delete(`/product/products/${id}`)
} catch{}
  }
  return (
    <CrudContext value={{ updateProduct, deleteProduct}}></CrudContext>
  )
};
const CrudContext.Provider = useContext(CrudContext)