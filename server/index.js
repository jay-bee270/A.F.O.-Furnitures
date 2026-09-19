import express from "express";
import cors from "cors";
import "dotenv/config";
import crypto from "crypto";

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Ids and prices (NGN) must match NewArrivals.jsx
const PRODUCTS = {
  1: { name: "Modern Sofa Set", price: 450000 },
  2: { name: "Ergonomic Office Chair", price: 85000 },
  3: { name: "Wooden Dining Table", price: 220000 },
  4: { name: "King Size Bed Frame", price: 300000 },
  5: { name: "Bookshelf Unit", price: 60000 },
  6: { name: "Coffee Table Set", price: 75000 },
};

const orders = new Map(); // in-memory: resets when the server restarts

const paystack = (path, opts = {}) =>
  fetch(`https://api.paystack.co${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());

app.post("/api/orders", (req, res) => {
  const { customer, items } = req.body;
  const { name, email, phone, address } = customer || {};
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: "Missing customer details" });
  }
  if (
    !Array.isArray(items) ||
    !items.length ||
    items.some((i) => !PRODUCTS[i.id] || !Number.isInteger(i.qty) || i.qty < 1)
  ) {
    return res.status(400).json({ error: "Invalid items" });
  }
  const lines = items.map((i) => ({
    id: i.id,
    name: PRODUCTS[i.id].name,
    price: PRODUCTS[i.id].price,
    qty: i.qty,
  }));
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const id = crypto.randomUUID();
  orders.set(id, { id, customer, items: lines, total, status: "pending" });
  res.json({ orderId: id, total });
});

app.post("/api/payments/initialize", async (req, res) => {
  const order = orders.get(req.body.orderId);
  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status === "paid") {
    return res.status(400).json({ error: "Order already paid" });
  }
  try {
    const data = await paystack("/transaction/initialize", {
      method: "POST",
      body: JSON.stringify({
        email: order.customer.email,
        amount: order.total * 100, // kobo
        reference: `AFO-${order.id}`,
        callback_url: process.env.FRONTEND_URL,
      }),
    });
    if (!data.status) {
      return res.status(502).json({ error: data.message || "Paystack error" });
    }
    res.json(data.data);
  } catch {
    res.status(500).json({ error: "Could not reach Paystack" });
  }
});

app.get("/api/payments/verify/:reference", async (req, res) => {
  const order = orders.get(req.params.reference.replace("AFO-", ""));
  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status === "paid") {
    return res.json({ status: order.status, order }); // already verified, don't re-check
  }
  try {
    const data = await paystack(`/transaction/verify/${req.params.reference}`);
    const paystackStatus = data.data?.status; // "success" | "failed" | "abandoned" etc.
    if (paystackStatus === "success" && data.data.amount === order.total * 100) {
      order.status = "paid";
    } else if (paystackStatus === "success") {
      // Paystack says success but amount doesn't match what we billed — do not trust it
      order.status = "failed";
      order.failReason = "amount_mismatch";
    } else {
      order.status = "failed";
      order.failReason = paystackStatus || "unknown";
    }
    res.json({ status: order.status, order });
  } catch {
    res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(process.env.PORT || 4000, () => console.log("API running"));