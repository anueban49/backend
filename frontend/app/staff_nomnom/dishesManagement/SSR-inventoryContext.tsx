"use client";
import { FormControl, FormItem, FormField } from "@/components/ui/form";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { Toaster } from "@/components/ui/sonner";
import { api } from "@/lib/axios";
import { toast } from "sonner";
//when clicked on the btn, dialog appears, containing the information of the entity. and user will edit it and send it to patch request
//products data, CRUD operations
export type CrudContextType = {
  categories: CategoryType[] | [];
  fetchAllCategories: () => Promise<void>;
  fetchCategoryByID: (_id: string) => Promise<CategoryType>;
  product: ProductType | null;
  productsbyid: ProductType[] | [];
  allProducts: ProductType[];
  updateProduct: (_id: string, data: ProductInputType) => Promise<void>;
  deleteProduct: (_id: string) => Promise<void>;
  createProduct: (data: ProductType) => Promise<void>;
  fetchProductbyID: (id: string) => Promise<ProductType>; //it should return a data with the type of ProductType
  fetchAllProduct: () => Promise<void>;
  fetchProductsbyCategory: (_id: string) => Promise<ProductType[]>;
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
  _id: string;
  timestamps: string;
  image: string;
  price: number;
  ingredients: string;
  category: CategoryType;
}; //this is a data type when it called from the backend

export type ProductInputType = {
  name: string;
  image: string;
  price: number;
  ingredients: string;
  category: CategoryType;
}; // this is a data type when sending it to the backend

export const CrudContext = createContext<CrudContextType | undefined>(
  undefined,
);

export const CrudProvider = ({ children }: CrudProviderProps) => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);

  const fetchAllCategories = async () => {
    try {
      const { data } = await api.get<CategoryType[]>("/category/all");
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
      console.error(error);
    }
  };
  const fetchCategoryByID = async (_id: string): Promise<CategoryType> => {
    try {
      const { data } = await api.get<CategoryType>(`/category/${_id}`);
      return data;
    } catch (error) {
      toast.error("failed to fetch category");
      throw error;
    }
  };
  const fetchAllProduct = async (): Promise<void> => {
    try {
      const { data } = await api.get<ProductType[]>("/product/all");
      setAllProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProductbyID = async (_id: string): Promise<ProductType> => {
    try {
      const { data } = await api.get<ProductType>(`/product/${_id}`);
      setProduct(data);
      console.log("fetchByIDresult:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const createProduct = async (data: ProductType) => {
    try {
      const res = await api.post(`/product/create`, {
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
  const updateProduct = async (_id: string, data: ProductInputType) => {
    try {
      const res = await api.patch<ProductType>(`/product/${_id}`, data);
      console.log("updated", res.data);
      setProducts((prevProducts) =>
        prevProducts.map((item: ProductType) =>
          item._id === _id ? res.data : item,
        ),
      );
    } catch (error) {
      console.error(error);
    }
    await fetchAllProduct();
  };
  const fetchProductsbyCategory = async (_id: string): Promise<ProductType[]> => {
    try {
      const { data } = await api.get<ProductType[]>(`/product/category/${_id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteProduct = async (_id: string) => {
    try {
      const res = await api.delete(`/product/${_id}`);
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
        categories,
        fetchAllCategories,
        fetchCategoryByID,
        updateProduct,
        deleteProduct,
        createProduct,
        fetchAllProduct,
        fetchProductbyID,
        fetchProductsbyCategory,
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
