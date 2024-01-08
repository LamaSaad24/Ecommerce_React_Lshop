import axios from "axios";
import { createContext, useState } from "react";


export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const [count, setCount] = useState(0)
    const [cart, setCart] = useState([])

    const addToCartContext = async (productId) => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}cart`, { productId },
                { headers: { Authorization: `Tariq__${token}` } })
            return data;
        } catch (e) {
            return e
        }
    }

    const getCartContext = async () => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}cart`,
                { headers: { Authorization: `Tariq__${token}` } })
            return data;
        } catch (e) {
            return e
        }
    }

    const removeFromCartContext = async (productId) => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}cart/removeItem`, { productId },
                { headers: { Authorization: `Tariq__${token}` } })
            return data;
        } catch (e) {
            return e
        }
    }


    return <CartContext.Provider value={{ count, addToCartContext, getCartContext, removeFromCartContext }}>{children}</CartContext.Provider>
}