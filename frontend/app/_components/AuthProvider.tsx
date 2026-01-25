"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import type { userFormdata, LoginType } from "./userSchema";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

type UserType = {
  username: string;
  email: string;
  password: string;
};
export type UserCompleteInfoType = {
  username: string;
  email: string;
  _id: string;
  image?: string;
  address?: string;
}; //this type is for response data
export type AuthContextType = {
  user: UserCompleteInfoType | null;
  error: Partial<Record<keyof userFormdata, string[]>> | null;
  signup: (data: UserType) => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  logout: () => void;
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
      const { data } = await api.post<UserType>("/user/signup", {
        email,
        username,
        password,
      });
      toast.loading("Creating account...");

      setUser(data.user || (data as any));
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
      setUser(user);
      localStorage.setItem("accessToken", accessToken);
      toast.success("Logged In!");
      setLoggingin(false);
      console.log("logged in:", data.user);

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
        const { data } = await api.get<{ user: LoginResponse }>("/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("fetchedData: [authprovider]", data);
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("accessToken");
      }
    };
    fetchMe();
  }, []);
  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, error, signup, login, logout }}>
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
