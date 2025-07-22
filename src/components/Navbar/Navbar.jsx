"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./Navbar.css"
import LanguageSelector from "../LanguageSelector/LanguageSelector"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { currentLanguage } = useLanguage()
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
          <LanguageSelector />
          <motion.button
            className="theme-toggle"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? "☀️" : "🌙"}
          </motion.button>
          <motion.button className="btn nav-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {t("nav.downloadApp")}
          </motion.button>
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
