
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); //-> for setting the itesm called form api.
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("");
      //...
      const data = await res.json();
      setItems(data);
    };
    getData();
  }, []);

  const multipleItem = (items) => {
    items.find((i) => i.count > 1);
  };

  const AddToCart = (item) => {
    // const itemExists = items.find((i) => item.id === i.id);
    const itemExists = (items) => {
      items.find((i) => i.id === item.id);
    };
    if (itemExists) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, count: i.count + 1 } : i
      );
    } else {
      setItems((prev) => [...prev, { ...item, count: 1 }]);
    }
  };
  const RemoveFromCart = (item) => {
    setItems((prev) => {
      const itemExists = (item) => {
        items.find((i) => i.id === item.id);
      };
      if (itemExists.count > 1) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, count: i.count - 1 } : i
        );
      }
      if (!itemExists) {
        return prev;
      }
      return prev.filter((i) => i.id !== item.id);
    });
  };

  const TotalPrice = (items) => {
    items.reduce((total, item) => total + item.price * item.count, 0);
  };
  const TotalQuantity = (items) => {
    items.reduce((total, item) => total + item.count, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        AddToCart,
        RemoveFromCart,
        TotalPrice,
        TotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("UseCart must be used within the provider");
  }
  return context;
};
