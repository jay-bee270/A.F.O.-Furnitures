"use client"

import { motion } from "framer-motion"
import "./Categories.css"

import livingroom1 from "../../assets/livingroom1.avif"
import bedroom1 from "../../assets/bedroom1.webp"
import office1 from "../../assets/office1.avif"
import diningroom1 from "../../assets/diningroom1.avif"
import outdoor1 from "../../assets/outdoor1.webp"
import kidsroom2 from "../../assets/kidsroom2.webp"

import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"

const Categories = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)

  const categories = [
    {
      id: 1,
      name: t("categories.items.livingRoom.name"),
      description: t("categories.items.livingRoom.description"),
      image: livingroom1,
      itemCount: t("categories.items.livingRoom.count"),
      icon: "🛋️",
      color: "#667eea",
    },
    {
      id: 2,
      name: t("categories.items.bedroom.name"),
      description: t("categories.items.bedroom.description"),
      image: bedroom1,
      itemCount: t("categories.items.bedroom.count"),
      icon: "🛏️",
      color: "#764ba2",
    },
    {
      id: 3,
      name: t("categories.items.office.name"),
      description: t("categories.items.office.description"),
      image: office1,
      itemCount: t("categories.items.office.count"),
      icon: "💼",
      color: "#f093fb",
    },
    {
      id: 4,
      name: t("categories.items.diningRoom.name"),
      description: t("categories.items.diningRoom.description"),
      image: diningroom1,
      itemCount: t("categories.items.diningRoom.count"),
      icon: "🍽️",
      color: "#f5576c",
    },
    {
      id: 5,
      name: t("categories.items.outdoor.name"),
      description: t("categories.items.outdoor.description"),
      image: outdoor1,
      itemCount: t("categories.items.outdoor.count"),
      icon: "🌿",
      color: "#4ecdc4",
    },
    {
      id: 6,
      name: t("categories.items.kidsRoom.name"),
      description: t("categories.items.kidsRoom.description"),
      image: kidsroom2,
      itemCount: t("categories.items.kidsRoom.count"),
      icon: "🧸",
      color: "#45b7d1",
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
    <section id="categories" className="section categories">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t("categories.title")}</h2>
          <p className="section-subtitle">{t("categories.subtitle")}</p>
        </motion.div>

        <motion.div
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="category-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div className="category-image">
                <img src={category.image || "/placeholder.svg"} alt={category.name} />
                <div className="category-overlay">
                  <motion.button className="btn category-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {t("categories.viewInApp")}
                  </motion.button>
                </div>
                <div className="category-icon" style={{ backgroundColor: `${category.color}20` }}>
                  <span style={{ color: category.color }}>{category.icon}</span>
                </div>
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="category-meta">
                  <span className="item-count">{category.itemCount}</span>
                  <span className="view-all">{t("categories.exploreInApp")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Categories
