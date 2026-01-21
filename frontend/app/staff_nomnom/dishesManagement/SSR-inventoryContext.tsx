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
//products data, CRUD operations
export type CrudContextType = {
  product: ProductType | null;
  allProducts: ProductType[];
  updateProduct: (id: string, data: ProductType) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  createProduct: (data: CreatenewType) => Promise<void>;
  fetchProductbyID: (id: string) => Promise<void>;
  fetchAllProduct: () => Promise<void>;
};
export type CrudProviderProps = {
  children: ReactNode;
};
export type CategoryType = {
  name: string;
  _id: string;
};
export type ProductType = {
  name: string;
  id: string;
  timestamps: string;
  image: string;
  price: number;
  ingredients: string;
  category: CategoryType
};

export const CrudContext = createContext<CrudContextType | undefined>(
  undefined,
);

export const CrudProvider = ({ children }: CrudProviderProps) => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);

  const fetchAllProduct = async () => {
    try {
      const { data } = await api.get<ProductType[]>(`/product/products`);
      setAllProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProductbyID = async (_id: string) => {
    try {
      const { data } = await api.get<ProductType>(`/product/${_id}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };
  const createProduct = async (data: ProductType) => {
    try {
      const res = await api.post(`/product/products/create`, {
        name: data.name,
        price: data.price,
        ingredients: data.ingredients,
        category: data.category,
        image: {
          url: data.image,
          publicId: "",
        },
      });
      console.log("newly added:", res);
      if (!res) {
        console.log("error adding item");
      }
    } catch (error) {
      console.error(error);
    }
    await fetchAllProduct();
  };
  const updateProduct = async (_id: string, data: ProductType) => {
    try {
      const res = await api.patch(`/product/products/${_id}`, data);
      console.log("updated", res.data);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    }
    await fetchAllProduct();
  };
  const deleteProduct = async (_id: string) => {
    try {
      const res = await api.delete(`/product/products/${_id}`);
      console.log("deleted", res.data);
      if (product?._id === _id) {
        setProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
    await fetchAllProduct();
  };
  return (
    <CrudContext.Provider
      value={{
        product,
        allProducts,
        updateProduct,
        deleteProduct,
        createProduct,
        fetchAllProduct,
        fetchProductbyID,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};
export const useIMcrud = () => {
  const context = useContext(CrudContext);
  if (context === undefined) {
    throw new Error("useCrud must be used within crudprovider");
  }
  return context;
};
