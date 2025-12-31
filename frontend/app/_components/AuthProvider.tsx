import {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { formSchema } from "./userSchema";
import type { userFormdata } from "./userSchema";
export type AuthContextType = {
  user: userFormdata | null;
  error: Partial<Record<keyof userFormdata, string[]>> | null;
  signup: (data: userFormdata) => void;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
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
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("user");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    const result = formSchema.safeParse(parsed);
    return result.success ? result.data : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user:", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const [error, setError] = useState<Partial<
    Record<keyof userFormdata, string[]>
  > | null>(null);

  function signup(data: userFormdata) {
    const result = formSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.flatten().fieldErrors);
      return;
    }

    setError(null);
    setUser(result.data);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, error, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
