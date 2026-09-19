import { useState } from "react"
import { useCart } from "../../contexts/CartContext"
import "./CartDrawer.css"

const API = import.meta.env.VITE_API_URL
const naira = (n) => `₦${n.toLocaleString()}`
const post = (url, body) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

export default function CartDrawer() {
  const { items, removeItem, setQty, total, isOpen, setIsOpen } = useCart()
  const [step, setStep] = useState("cart")
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const pay = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const orderRes = await post(`${API}/api/orders`, {
        customer: form,
        items: items.map(({ id, qty }) => ({ id, qty })),
      })
      const order = await orderRes.json()
      if (!orderRes.ok) throw new Error(order.error || "Could not create order")

      const payRes = await post(`${API}/api/payments/initialize`, { orderId: order.orderId })
      const payment = await payRes.json()
      if (!payRes.ok || !payment.authorization_url) throw new Error(payment.error || "Could not start payment")

      window.location.href = payment.authorization_url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="cart-overlay" onClick={() => setIsOpen(false)}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>{step === "cart" ? "Your Cart" : "Checkout"}</h3>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : step === "cart" ? (
          <>
            <ul className="cart-items">
              {items.map((i) => (
                <li key={i.id}>
                  <img src={i.image} alt={i.name} />
                  <div className="cart-item-info">
                    <strong>{i.name}</strong>
                    <span>{naira(i.price)}</span>
                    <div className="cart-qty">
                      <button onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                      <span>{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                      <button className="cart-remove" onClick={() => removeItem(i.id)}>Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-footer">
              <div className="cart-total"><span>Total</span><strong>{naira(total)}</strong></div>
              <button className="cart-btn" onClick={() => setStep("details")}>Proceed to Checkout</button>
            </div>
          </>
        ) : (
          <form className="cart-form" onSubmit={pay}>
            <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
            <input name="phone" type="tel" placeholder="Phone number" value={form.phone} onChange={onChange} required />
            <textarea name="address" placeholder="Delivery address" value={form.address} onChange={onChange} required />
            <div className="cart-total"><span>Total</span><strong>{naira(total)}</strong></div>
            {error && <p className="cart-error">{error}</p>}
            <button className="cart-btn" disabled={loading}>{loading ? "Redirecting to Paystack..." : "Pay with Paystack"}</button>
            <button type="button" className="cart-link" onClick={() => setStep("cart")}>← Back to cart</button>
          </form>
        )}
      </aside>
    </div>
  )
}