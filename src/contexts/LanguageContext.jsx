"use client"

import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("afo-language")
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode)
    localStorage.setItem("afo-language", languageCode)

    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: languageCode }))
  }

  const value = {
    currentLanguage,
    changeLanguage,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
