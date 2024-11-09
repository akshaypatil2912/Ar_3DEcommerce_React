import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Create a custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// Create the Cart Provider that will wrap the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // This is the global cart state

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);  // Add product to the cart
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}  {/* Render the rest of the app */}
    </CartContext.Provider>
  );
};
