"use client";
import {
  ReactNode,
  Children,
  createContext,
  useContext,
  useState,
  use,
  useEffect,
} from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  StaffLoginFormType,
  StaffRegistry,
} from "@/app/schemas/StaffSchema";
export type StaffType = {
  StaffID: string;
  firstname: string;
  lastname: string;
  email: string;
  profileImage?: string;
  SSN: string;
  _id?: string;
};
type StaffwithoutPassword = Omit<StaffType, "password">;
export type StaffSignup = Omit<StaffRegistry, "confirmpassword" | "dob">;
type LoginResponse = {
  staff: StaffwithoutPassword;
  accessToken: string;
};
export interface StaffContextType {
  staff: StaffwithoutPassword | null;
  signup: (data: StaffSignup) => Promise<void>;
  login: (data: StaffLoginFormType) => Promise<void>;
  logout: () => void;
}
export const StaffAuthContext = createContext<StaffContextType | undefined>(
  undefined,
);

export const StaffAuthProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<StaffType | null>(null);
  const router = useRouter();

  const signup = async (input: StaffSignup) => {
    try {
      const res = await api.post<{ staff: StaffType }>("/staff/add", input);
      console.log(res);
    } catch (error) {
      console.error("Signup error:", error);
      throw error; // Re-throw so handleSignup can catch it
    }
  };
  const login = async ({ StaffID, password }: StaffLoginFormType) => {
    try {
      const { data } = await api.post<LoginResponse>("/staff/login", {
        StaffID,
        password,
      });
      const { staff, accessToken } = data;
      localStorage.setItem("staffAccessToken", accessToken);
      console.log("login staff", staff);
      setStaff(staff);
      if (staff) {
        router.push("/staff_nomnom");
      }
    } catch (error) {
      setStaff(null);
      localStorage.removeItem("staffAccessToken");
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchStaff = async () => {
      const token = localStorage.getItem("staffAccessToken");
      localStorage.removeItem("accessToken");
      if (!token) {
        console.log("token not found");
        router.push("/staff_nomnom/authorization");
        return;
      }
      try {
        const { data } = await api.get<{ staff: StaffwithoutPassword }>(
          "/staff/fetchstaff",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setStaff(data.staff);
        router.push("/staff_nomnom");
      } catch (error) {
        localStorage.removeItem("staffAccessToken");
        setStaff(null);
      }
    };
    fetchStaff();
  }, [router]);

  const logout = () => {
    setStaff(null);
    localStorage.removeItem("staffAccessToken");
  };

  return (
    <StaffAuthContext.Provider value={{ staff, login, signup, logout }}>
      {children}
    </StaffAuthContext.Provider>
  );
};

export function useStaffAuth() {
  const context = useContext(StaffAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
//staff schema includes first, last name etc.
//let there be default admin that is for adding new staff authorized.
//when new staff is ready to be registered, let there be a referral code/id.
