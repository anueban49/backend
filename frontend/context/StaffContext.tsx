import {
  ReactNode,
  Children,
  createContext,
  useContext,
  useState,
  use,
} from "react";
import { api } from "@/lib/axios";
export type StaffType = {
  StaffId?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profileImage?: string;
  _id?: string;
};

export interface StaffContextType {
  staff: StaffType;
  signup: (id: string) => Promise<void>;
  login: (staffID: string) => Promise<void>;
  logout: () => void;
  useStaffAuth: () => void;
}
export const StaffAuthContext = createContext<StaffContextType | undefined>(
  undefined,
);

export const StaffAuthProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<StaffType | null>(null);

  const signup = async ({
    firstname,
    lastname,
    email,
    password,
  }: StaffType) => {
    try {
      const res = await api.post("/staff/add", {
        firstname,
        lastname,
        email,
        password,
      });
      console.log("response:", res);
    } catch (error) {
      console.error(error);
    }
  };
  const login = async ({ StaffId, password }: StaffType) => {
    try {
      const res = await api.post("/staff/login", { StaffId, password });
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {};

  return (
    <StaffAuthContext.Provider
      value={(staff, signup, login, logout, )}
    >
      {children}
    </StaffAuthContext.Provider>
  );
};

const useStaffAuth = useContext(StaffAuthContext)
//staff schema includes first, last name etc.
//let there be default admin that is for adding new staff authorized.
//when new staff is ready to be registered, let there be a referral code/id.
