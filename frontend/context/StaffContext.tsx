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
  StaffRegistryType,
} from "@/app/schemas/StaffSchema";
export type StaffType = {
  StaffID: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  profileImage?: string;
  SSN: string;
  _id?: string;
};
type StaffSignup = Omit<StaffRegistryType, "confirmpassword" | "dob">;
type LoginResponse = {
  staff: StaffType;
  accessToken: string;
};

type StaffwithoutPassword = Omit<StaffType, "password">;

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
  const [staff, setStaff] = useState<StaffwithoutPassword | null>(null);
  const router = useRouter();

  const signup = async (input: StaffSignup) => {
    try {
      const { data } = await api.post<{ staff: StaffType }>(
        "/staff/add",
        input,
      );
      const { password, ...staffWithoutPassword } = data.staff;
      setStaff(staffWithoutPassword);
      console.log("Staff created:", staffWithoutPassword);
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
      setStaff(staff);
      localStorage.setItem("accesstoken", accessToken);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    const fetchStaff = async () => {
      const token = localStorage.getItem("accesstoken");
      if (!token) {
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
        console.log("fetchedData: [staffProv]", staff);
      } catch (error) {
        localStorage.removeItem("accesstoken");
        setStaff(null);
      }
    };
    fetchStaff();
  }, []);

  const logout = () => {
    setStaff(null);
    localStorage.removeItem("accesstoken");
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
