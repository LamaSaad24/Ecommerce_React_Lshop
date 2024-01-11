import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
    useEffect(
        () => {
            if (localStorage.getItem("token"))
                saveCurrentUser()
        }
        , []);

    const [userToken, setUserToken] = useState(null)


    const saveCurrentUser = () => {
        const token = localStorage.getItem("token")
        const userToken = jwtDecode(token)
        setUserToken(userToken)
    }

    return <UserContext.Provider
        value={{ userToken, setUserToken }}>
        {children}
    </UserContext.Provider>
}