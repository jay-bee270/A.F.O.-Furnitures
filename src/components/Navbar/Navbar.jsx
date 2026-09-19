"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./Navbar.css"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"
import { useCart } from "../../contexts/CartContext"

// Paste the URL of your app landing page here to show a small "Get the App" link
const APP_LANDING_URL = ""

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { currentLanguage } = useLanguage()
  const { count, setIsOpen } = useCart()
  const t = (key) => getTranslation(currentLanguage, key)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.categories"), href: "#categories" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.reviews"), href: "#testimonials" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  return (
    <motion.nav
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="logo-icon">
            <span>🏠</span>
          </div>
          <span className="logo-text">A.F.O. Furnitures</span>
        </motion.div>

        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="nav-actions">
          <motion.button
            className="theme-toggle"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Cart"
          >
            🛒{count > 0 && <span className="cart-count">{count}</span>}
          </motion.button>
          <motion.button
            className="theme-toggle"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? "☀️" : "🌙"}
          </motion.button>
          {APP_LANDING_URL && (
            <motion.a
              className="btn nav-btn"
              href={APP_LANDING_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get the App
            </motion.a>
          )}
        </div>

        <div
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar