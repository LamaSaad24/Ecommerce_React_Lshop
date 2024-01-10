import axios from "axios";
import { createContext } from "react";

export const ProfileContext = createContext(null)

export const ProfileContextProvider = ({ children }) => {
    const token = localStorage.getItem("token")

    const getUserContext = async ()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}user/profile`,
            {headers:{Authorization : `Tariq__${token}`}})
            return data
        } catch (error) {
            return error
        }
    }

    const getOrderContext = async ()=>{
        try {
            const {data} =  await axios.get(`${import.meta.env.VITE_API_URL}order`,{
                headers:{Authorization: `Tariq__${token}`}
            })
            return data
        } catch (error) {
            return error
        }
    }

    return <ProfileContext.Provider
        value={{getUserContext, getOrderContext}}>
        {children}
    </ProfileContext.Provider>
}