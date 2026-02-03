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
import { StaffLoginFormType, StaffRegistryType } from "@/app/schemas/StaffSchema";
export type StaffType = {
  StaffId?: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  profileImage?: string;
  SSN: string;
  _id?: string;
};

type LoginResponse = {
  staff: StaffType;
  accessToken: string;
};

type StaffwithoutPassword = Omit<StaffType, "password">;

export interface StaffContextType {
  staff: StaffwithoutPassword | null;
  signup: (data: StaffRegistryType) => Promise<void>;
  login: (data: StaffLoginFormType) => Promise<void>;
  logout: () => void;
}
export const StaffAuthContext = createContext<StaffContextType | undefined>(
  undefined,
);

export const StaffAuthProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<StaffType | null>(null);
  const router = useRouter();

  const signup = async (input: StaffRegistryType) => {
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
  const login = async ({ StaffId, password }: StaffType) => {
    try {
      const { data } = await api.post<LoginResponse>("/staff/login", {
        StaffId,
        password,
      });
      const { staff, accessToken } = data;
      setStaff(staff);
      localStorage.setItem("accesstoken", accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      router.push("/staff_nomnom/authorization");
    }
    const fetchStaff = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }
      try {
        const { data } = await api.get<StaffType>("/staff/fetchstaff", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStaff(data);
      } catch (error) {
        localStorage.removeItem("accesstoken");
        console.error(error);
      }
    };
    fetchStaff();
  }, []);

  const logout = () => {
    setStaff(null);
    localStorage.removeItem("accessToken");
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
