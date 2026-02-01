import { ReactNode, Children, createContext, useContext } from "react";

export type StaffType = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  staffID: string;
};

export interface StaffContextType {
  staff: StaffType;
  signup: (id: string) => Promise<void>;
  login: (staffID: string) => Promise<void>;
  logout: () => void;
}
export const StaffAuthContext = createContext<StaffContextType | undefined>(
  undefined,
);

export const StaffAuthProvider = ({ children }: { children: ReactNode }) => {
  const signup = () => {}
  const login = () => { };
  const logout = () => {};

  return (
    <StaffAuthContext.Provider value={(staff, signup, login, logout)}>
      {children}
    </StaffAuthContext.Provider>
  );
};

//staff schema includes first, last name etc.
//let there be default admin that is for adding new staff authorized.
//when new staff is ready to be registered, let there be a referral code/id.
