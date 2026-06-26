'use client'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prev => {
      if (prev.find(p => p.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const clearCart = () => setCart([])

  const isInCart = (id) => cart.some(p => p.id === id)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}