import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const logout = () => {
        setUser({});
    };

    const login = (user) => {
        setUser(user)
    }

    return (
    <UserContext.Provider value={{ user, logout, login}}>{children}</UserContext.Provider>
    );
};

