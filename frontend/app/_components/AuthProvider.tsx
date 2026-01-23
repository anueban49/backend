"use client";
import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { formSchema } from "./userSchema";
import type { userFormdata } from "./userSchema";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

type UserType = {
  username: string;
  email: string;
  password: string;
};
type UserCompleteInfoType = {
  username: string;
  email: string;
  _id: string;
  timestamps: string;
}; //this type is for response data
export type AuthContextType = {
  user: UserType | null;
  error: Partial<Record<keyof userFormdata, string[]>> | null;
  signup: (data: UserType) => Promise<void>;
  login: ({ email, password }: UserType) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext({} as AuthContextType);
export type AuthProviderProps = {
  children: ReactNode;
};
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
} //-> this a custom hook. AI recommended and said it must be.
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null); //for setting user for one session
  const [error, setError] = useState<Partial<
    Record<keyof userFormdata, string[]>
  > | null>(null);

  const signup = async (data: UserType) => {
    try {
      await api.post<UserType>("/user/register", data);
      console.log("new user created:");
      setUser((data) => data);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post("user/login", {
      email,
      password,
    });
    const user = data;
    setUser(user);
  };
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, error, signup, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
