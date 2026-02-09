"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import type { userFormdata, LoginType } from "../schemas/userSchema";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { AddressFormdata } from "../schemas/userAddressSchema";
type UserType = {
  username: string;
  email: string;
  password: string;
};
export type AddressType = AddressFormdata;
export type UserCompleteInfoType = {
  username: string;
  email: string;
  _id: string;
  image: string | null;
  address: AddressType | null | string[];
}; //this type is for response data
export type AuthContextType = {
  user: UserCompleteInfoType | null;
  error: Partial<Record<keyof userFormdata, string[]>> | null;
  signup: (data: UserType) => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  logout: (_id: string, data: UserCompleteInfoType) => void;
  editinfo: () => void; //patch request function, that has to update/edit information of the user.
  refreshUser: () => Promise<void>;
};

type LoginResponse = {
  user: UserCompleteInfoType;
  accessToken: string;
};
export type AuthProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserCompleteInfoType | null>(null); //for setting user for one session
  const [error, setError] = useState<Partial<
    Record<keyof userFormdata, string[]>
  > | null>(null);
  const [creating, setCreating] = useState(false);
  const [loggingin, setLoggingin] = useState(false);
  const router = useRouter();

  const signup = async ({ email, password, username }: UserType) => {
    setCreating(true);
    try {
      const { data } = await api.post<LoginResponse>("/user/signup", {
        email,
        username,
        password,
      });
      toast.loading("Creating account...");
      console.log(data);

      const { user, accessToken } = data;
      localStorage.setItem("accessToken", accessToken);

      setUser(user);

      toast.success("Account Created!");
      setCreating(false);
      router.push("/");
    } catch (error) {
      toast.error("Failed to create account");
      console.error(error);
      setCreating(false);
    }
  };

  const login = async ({ email, password }: LoginType) => {
    setLoggingin(true);
    try {
      const { data } = await api.post<LoginResponse>("/user/login", {
        email,
        password,
      });

      const { user, accessToken } = data;
      localStorage.setItem("accessToken", accessToken);
      setUser(user);

      toast.success("Logged In!");
      setLoggingin(false);
      console.log("logged in:", user);

      router.push("/");
    } catch (error) {
      toast.error("Failed to log in");
      console.log(error);
      setLoggingin(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchMe = async () => {
      try {
        const { data } = await api.get<{ user: UserCompleteInfoType }>(
          "/user/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    };
    fetchMe();
  }, []);

  const refreshUser = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await api.get<{ user: UserCompleteInfoType }>(
        "/user/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setUser(data.user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
  }
  const editinfo = async () => {};

  return (
    <AuthContext.Provider
      value={{ user, error, signup, login, logout, editinfo, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
} //-> this a custom hook. AI recommended and said it must be.
