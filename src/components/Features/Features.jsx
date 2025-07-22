"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"
import "./Features.css"

const Features = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)

  const features = [
    {
      id: 1,
      icon: "🏠",
      title: t("features.items.arPlanner.title"),
      description: t("features.items.arPlanner.description"),
      color: "#667eea",
      delay: 0.1,
    },
    {
      id: 2,
      icon: "🌍",
      title: t("features.items.multiLanguage.title"),
      description: t("features.items.multiLanguage.description"),
      color: "#48bb78",
      delay: 0.2,
    },
    {
      id: 3,
      icon: "💱",
      title: t("features.items.currency.title"),
      description: t("features.items.currency.description"),
      color: "#ed8936",
      delay: 0.3,
    },
    {
      id: 4,
      icon: "⚖️",
      title: t("features.items.comparison.title"),
      description: t("features.items.comparison.description"),
      color: "#9f7aea",
      delay: 0.4,
    },
    {
      id: 5,
      icon: "📱",
      title: t("features.items.mobile.title"),
      description: t("features.items.mobile.description"),
      color: "#38b2ac",
      delay: 0.5,
    },
    {
      id: 6,
      icon: "🔍",
      title: t("features.items.search.title"),
      description: t("features.items.search.description"),
      color: "#f56565",
      delay: 0.6,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <section id="features" className="section features">
      <div className="features-background">
        <div className="features-shapes">
          <div className="feature-shape shape-1"></div>
          <div className="feature-shape shape-2"></div>
          <div className="feature-shape shape-3"></div>
        </div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t("features.title")}</h2>
          <p className="section-subtitle">{t("features.subtitle")}</p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              variants={itemVariants}
              whileHover={{
                y: -15,
                transition: { duration: 0.3 },
              }}
            >
              <div className="feature-card-inner">
                <div
                  className="feature-icon"
                  style={{
                    backgroundColor: `${feature.color}15`,
                    border: `2px solid ${feature.color}30`,
                  }}
                >
                  <span style={{ color: feature.color }}>{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-arrow">
                  <span style={{ color: feature.color }}>→</span>
                </div>
              </div>
              <div className="feature-glow" style={{ background: `${feature.color}20` }}></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>{t("features.cta.title")}</h3>
          <p>{t("features.cta.subtitle")}</p>
          <div className="cta-buttons">
            <motion.button className="btn features-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span>📱</span>
              {t("features.cta.button")}
            </motion.button>
          </div>
          <div className="app-store-badges">
            <a
                href="https://apps.apple.com/app/id0000000000" // 🔁 Replace with your real App Store link
                target="_blank"
                rel="noopener noreferrer"
                className="store-badge"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="app-store-badge"
                />
              </a>
            <a
                href="https://play.google.com/store/apps/details?id=com.yourapp.id" // Replace with your app's Play Store link
                target="_blank"
                rel="noopener noreferrer"
                className="store-badge"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="google-play-badge"
                />
              </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
