import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("afo-cart")) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem("afo-cart", JSON.stringify(items))
  }, [items])

  const addItem = (p) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === p.id)
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 }]
    })
    setIsOpen(true)
  }
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const setQty = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  const clear = () => setItems([])
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}