"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import "./LanguageSelector.css"

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="language-selector">
      <motion.button
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flag">{currentLang.flag}</span>
        <span className="language-code">{currentLang.code.toUpperCase()}</span>
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="language-dropdown-scroll">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  className={`language-option ${currentLanguage === language.code ? "active" : ""}`}
                  onClick={() => handleLanguageChange(language.code)}
                  whileHover={{ backgroundColor: "rgba(116, 185, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flag">{language.flag}</span>
                  <span className="language-name">{language.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && <div className="language-overlay" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

export default LanguageSelector
