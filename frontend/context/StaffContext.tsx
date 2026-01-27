import { ReactNode, Children, createContext, useContext } from "react";

export interface StaffContextType {
    username: string;
    staffId: string;
    email: string;
}
const StaffContext = createContext<StaffContextType[]>([]);

const StaffProvider = ({ children }: { children: ReactNode }) => {
    const Login = () => { };
    const LogOut = () => { };

    return <StaffContext.Provider>
        {children}
    </StaffContext.Provider>;
};

