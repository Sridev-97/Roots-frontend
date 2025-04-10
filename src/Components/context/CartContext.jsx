import React, { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);


    const addtocart = (item) => {
        setCartItems((prev) =>{
            const existingIndex = prev.findIndex((i)=> i.title === item.title);
            if(existingIndex !== -1){
                const updated = [...prev];
                updated[existingIndex].quantity += 1;
                return updated;
            }
            return[...prev, {...item, quantity: 1}];
        })
    };

    const increaseQty = (index) => {
        setCartItems((prev) => {
            const updated = [...prev];
            updated[index].quantity += 1;
            return updated;
        });
    };
    
    const decreaseQty = (index) => {
        setCartItems((prev) => {
            const updated = [...prev];
            if (updated[index].quantity > 1) {
                updated[index].quantity -= 1;
            }
            return updated;
        });
    }

    const removeFromCart = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <cartContext.Provider value={{ cartItems, addtocart, removeFromCart, increaseQty, decreaseQty }}>
            {children}
        </cartContext.Provider>
    );
};