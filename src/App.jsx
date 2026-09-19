"use client"

import { useState, useEffect } from "react"
import "./App.css"
import { LanguageProvider } from "./contexts/LanguageContext"
import { CartProvider } from "./contexts/CartContext"
import CartDrawer from "./components/CartDrawer/CartDrawer"
import PaymentStatus from "./components/CartDrawer/PaymentStatus"
import Navbar from "./components/Navbar/Navbar"
import Hero from "./components/Hero/Hero"
import Categories from "./components/Categories/Categories"
import NewArrivals from "./components/NewArrivals/NewArrivals"
import Features from "./components/Features/Features"
import Testimonials from "./components/Testimonials/Testimonials"
import Contact from "./components/ContactCTA/Contacts"
import Footer from "./components/Footer/Footer"

function App() {
  const [darkMode, setDarkMode] = useState(true) // Default to dark mode

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else {
      // Set dark mode as default if no saved preference
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light")
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  // Set RTL direction for Arabic and other RTL languages
  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLanguage = localStorage.getItem("afo-language") || "en"
      const rtlLanguages = ["ar", "he", "fa", "ur"]
      const isRTL = rtlLanguages.includes(currentLanguage)

      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr")
      document.documentElement.setAttribute("lang", currentLanguage)
    }

    // Initial setup
    handleLanguageChange()

    // Listen for language changes
    window.addEventListener("storage", handleLanguageChange)

    // Custom event for language changes within the same tab
    window.addEventListener("languageChanged", handleLanguageChange)

    return () => {
      window.removeEventListener("storage", handleLanguageChange)
      window.removeEventListener("languageChanged", handleLanguageChange)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <div className={`App ${darkMode ? "dark" : "light"}`}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <PaymentStatus />
          <CartDrawer />
          <Hero />
          <Categories />
          <NewArrivals />
          <Features />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      </CartProvider>
    </LanguageProvider>
  )
}

export default App