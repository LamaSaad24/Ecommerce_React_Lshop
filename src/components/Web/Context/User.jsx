import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
    // useEffect(
    //     () => {
    //         if (localStorage.getItem("token"))
    //             saveCurrentUser()
    //     }
    //     , []);

    const [userToken, setUserToken] = useState(null)


    const saveCurrentUser = () => {
        const token = localStorage.getItem("token")
        const userToken = jwtDecode(token)
        setUserToken(userToken)
    }

    const getUserContext = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}user/profile`,
                { headers: { Authorization: `Tariq__${userToken}` } })
            return data
        } catch (error) {
            return error
        }
    }

    const getOrderContext = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}order`, {
                headers: { Authorization: `Tariq__${userToken}` }
            })
            return data
        } catch (error) {
            return error
        }
    }

    return <UserContext.Provider
        value={{ userToken, setUserToken, getUserContext, getOrderContext }}>
        {children}
    </UserContext.Provider>
}