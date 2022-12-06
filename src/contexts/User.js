import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const logout = () => {
        setUser({});
    };

    const login = (user) => {
        //api logic here
    }

    return (
    <UserContext.Provider value={{ user, setUser, logout, login}}>{children}</UserContext.Provider>
    );
};

