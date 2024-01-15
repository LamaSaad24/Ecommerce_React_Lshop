import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";


export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {

    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)

    const {token} = useContext(UserContext)



    const getTotal = ({ products }) => {
        let t = 0
        products.map(e => t += e.quantity * e.details.finalPrice)
        setTotal(t)
    }

    const addToCartContext = async (productId) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}cart`, { productId },
                { headers: { Authorization: `Tariq__${token}` } })
            setCount(count + 1)
            return data;
        } catch (e) {
            let msg ;
            if(!token) msg = {type:"login"}
            else msg = e
            return msg
        }
    }

    const getCartContext = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}cart`,
                { headers: { Authorization: `Tariq__${token}` } })
            setCount(data.count)
            getTotal(data)
            return data;
        } catch (e) {
            return e
        }
    }

    const removeFromCartContext = async (productId) => {
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}cart/removeItem`, { productId },
                { headers: { Authorization: `Tariq__${token}` } })
                setCount(count-1)
            return data;
        } catch (e) {
            return e
        }
    }

    const clearCartContext = async () => {
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}cart/clear`, {},
                { headers: { Authorization: `Tariq__${token}` } })
            setCount(0)
            return data;
        } catch (e) {
            return e
        }
    }

    const changeQuantityContext = async (productId, price, key) => {
        if (key == "increase") {
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}cart/incraseQuantity`, { productId },
                    { headers: { Authorization: `Tariq__${token}` } })
                setTotal(total + price)
                return data;
            } catch (e) {
                return e
            }
        } else {
            try {
                const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}cart/decraseQuantity`, { productId },
                    { headers: { Authorization: `Tariq__${token}` } })
                setTotal(total - price)
                return data;
            } catch (e) {
                return e
            }
        }
    }

    useEffect(() => {
        getCartContext()
    }, [])

    return <CartContext.Provider value={{
        total, count,
        setCount,
        addToCartContext,
        getCartContext,
        removeFromCartContext,
        clearCartContext,
        changeQuantityContext
    }}>{children}</CartContext.Provider>
}