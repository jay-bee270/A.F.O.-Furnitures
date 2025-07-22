"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "./BillingForm.css"

const BillingForm = () => {
  const [activeTab, setActiveTab] = useState("billing")
  const [formData, setFormData] = useState({
    // Billing Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Shipping Information
    sameAsBilling: true,
    shippingFirstName: "",
    shippingLastName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZipCode: "",
    shippingCountry: "",

    // Delivery Options
    deliveryOption: "standard",
    deliveryDate: "",
    deliveryTime: "",

    // Payment
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [selectedLanguage, setSelectedLanguage] = useState("EN")

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  ]

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
    { code: "PT", name: "Português", flag: "🇵🇹" },
  ]

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: "Free",
      time: "5-7 business days",
      icon: "📦",
    },
    {
      id: "express",
      name: "Express Delivery",
      price: "$15",
      time: "2-3 business days",
      icon: "⚡",
    },
    {
      id: "same-day",
      name: "Same-Day Delivery",
      price: "$25",
      time: "Within 24 hours",
      icon: "🚀",
    },
    {
      id: "scheduled",
      name: "Scheduled Delivery",
      price: "$10",
      time: "Choose your date",
      icon: "📅",
    },
  ]

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "💳" },
    { id: "paypal", name: "PayPal", icon: "🟦" },
    { id: "apple-pay", name: "Apple Pay", icon: "🍎" },
    { id: "google-pay", name: "Google Pay", icon: "🔵" },
    { id: "crypto", name: "Cryptocurrency", icon: "₿" },
  ]

  const tabs = [
    { id: "billing", name: "Billing Info", icon: "📋" },
    { id: "shipping", name: "Shipping", icon: "📦" },
    { id: "delivery", name: "Delivery", icon: "🚚" },
    { id: "payment", name: "Payment", icon: "💳" },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thank you for exploring our app features! This is a demo of the A.F.O. Furnitures checkout experience.")
  }

  return (
    <section id="contact" className="section billing-form">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Experience Our App Features</h2>
          <p className="section-subtitle">
            Try our comprehensive billing, shipping, and payment system with multi-language and currency support
          </p>
        </motion.div>

        <motion.div
          className="form-controls"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="currency-language-selector">
            <div className="selector-group">
              <label>💱 Currency:</label>
              <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="selector-group">
              <label>🌍 Language:</label>
              <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.flag} {language.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="form-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="form-tabs">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-name">{tab.name}</span>
              </motion.button>
            ))}
          </div>

          <form className="billing-form-content" onSubmit={handleSubmit}>
            {activeTab === "billing" && (
              <motion.div
                className="form-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>📋 Billing Information</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="full-width"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP/Postal Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="full-width"
                    required
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                className="form-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>📦 Shipping Information</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="sameAsBilling"
                      checked={formData.sameAsBilling}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Same as billing address
                  </label>
                </div>
                {!formData.sameAsBilling && (
                  <div className="form-grid">
                    <input
                      type="text"
                      name="shippingFirstName"
                      placeholder="First Name"
                      value={formData.shippingFirstName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="shippingLastName"
                      placeholder="Last Name"
                      value={formData.shippingLastName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="shippingAddress"
                      placeholder="Street Address"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      className="full-width"
                    />
                    <input
                      type="text"
                      name="shippingCity"
                      placeholder="City"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="shippingState"
                      placeholder="State/Province"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="shippingZipCode"
                      placeholder="ZIP/Postal Code"
                      value={formData.shippingZipCode}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="shippingCountry"
                      placeholder="Country"
                      value={formData.shippingCountry}
                      onChange={handleInputChange}
                      className="full-width"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "delivery" && (
              <motion.div
                className="form-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>🚚 Delivery Options</h3>
                <div className="delivery-options">
                  {deliveryOptions.map((option) => (
                    <label key={option.id} className="delivery-option">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value={option.id}
                        checked={formData.deliveryOption === option.id}
                        onChange={handleInputChange}
                      />
                      <div className="option-content">
                        <div className="option-icon">{option.icon}</div>
                        <div className="option-details">
                          <div className="option-header">
                            <span className="option-name">{option.name}</span>
                            <span className="option-price">{option.price}</span>
                          </div>
                          <span className="option-time">{option.time}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {(formData.deliveryOption === "scheduled" || formData.deliveryOption === "same-day") && (
                  <div className="form-grid">
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <input type="time" name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} />
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "payment" && (
              <motion.div
                className="form-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3>💳 Payment Method</h3>
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                      />
                      <div className="method-content">
                        <span className="method-icon">{method.icon}</span>
                        <span className="method-name">{method.name}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="card-details">
                    <div className="form-grid">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="full-width"
                      />
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Cardholder Name"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="full-width"
                      />
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <div className="form-actions">
              <motion.button
                type="button"
                className="btn btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save for Later
              </motion.button>
              <motion.button
                type="submit"
                className="btn submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Complete Demo
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default BillingForm
