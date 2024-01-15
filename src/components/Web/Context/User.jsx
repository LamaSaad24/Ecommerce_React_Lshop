import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
    
    const [userToken, setUserToken] = useState(null)
    const [token, setToken] = useState(null)
    

    const saveCurrentUser = () => {
        const token = localStorage.getItem("token")
        setToken(token)
        const userToken = jwtDecode(token)
        setUserToken(userToken)
    }

    const getUserContext = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}user/profile`,
                { headers: { Authorization: `Tariq__${token}` } })
            return data
        } catch (error) {
            return error
        }
    }

    const getOrderContext = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}order`, {
                headers: { Authorization: `Tariq__${token}` }
            })
            return data
        } catch (error) {
            return error
        }
    }
    
    useEffect(
        () => {
            if (localStorage.getItem("token"))
                saveCurrentUser()
        }
        , []);

    return <UserContext.Provider
        value={{ userToken,token, setUserToken, getUserContext, getOrderContext }}>
        {children}
    </UserContext.Provider>
}