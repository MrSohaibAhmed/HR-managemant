
import { useState } from "react";
import AppContext from "./appContext";

export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState(null);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                error,
                token,
                userData,
                role,
                setRole,
                setIsLoggedIn,
                setIsLoading,
                setError,
                setToken,
                setUserData
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
