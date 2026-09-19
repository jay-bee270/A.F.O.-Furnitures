import { useEffect, useState } from "react"
import { useCart } from "../../contexts/CartContext"

export default function PaymentStatus() {
  const { clear } = useCart()
  const [state, setState] = useState(null)

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("reference")
    if (!ref) return
    setState({ type: "loading", message: "Verifying your payment..." })
    fetch(`${import.meta.env.VITE_API_URL}/api/payments/verify/${ref}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "paid") {
          clear()
          setState({ type: "success", message: `Payment confirmed. Order ${d.order.id.slice(0, 8)} is paid.` })
        } else if (d.status === "failed") {
          setState({ type: "error", message: "Payment failed or was declined. Please try again." })
        } else {
          setState({ type: "error", message: "Payment was not completed." })
        }
      })
      .catch(() => setState({ type: "error", message: "Could not verify payment." }))
      .finally(() => window.history.replaceState({}, "", window.location.pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!state) return null
  return (
    <div className={`payment-banner ${state.type}`}>
      <span>{state.message}</span>
      {state.type !== "loading" && <button onClick={() => setState(null)}>✕</button>}
    </div>
  )
}