"use client"

import { motion } from "framer-motion"
import "./Hero.css"
import furniture from "../../assets/furniture3.webp"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"

const Hero = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="hero-container">
        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="hero-badge" variants={itemVariants}>
            <span>{t("hero.badge")}</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            {t("hero.title")}
            <span className="gradient-text">{t("hero.titleGradient")}</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t("hero.subtitle")}
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <button className="btn btn-primary">
              <span>📱</span>
              {t("hero.downloadApp")}
            </button>
            <button className="btn btn-outline">
              <span>🔍</span>
              {t("hero.tryAR")}
            </button>
          </motion.div>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat">
              <h3>50K+</h3>
              <p>{t("hero.stats.downloads")}</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>{t("hero.stats.items")}</p>
            </div>
            <div className="stat">
              <h3>15+</h3>
              <p>{t("hero.stats.languages")}</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="image-container">
            <img src={furniture || "/placeholder.svg"} alt="A.F.O. Furnitures App Interface" className="hero-img" />
            <div className="floating-card card-1">
              <div className="card-icon">🏠</div>
              <div className="card-content">
                <h4>AR Preview</h4>
                <p>See in your space</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">⭐</div>
              <div className="card-content">
                <h4>4.8 Rating</h4>
                <p>App Store</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
