"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"
import "./NewArrivals.css"

import sofaset2 from "../../assets/sofaset2.webp"
import officechair1 from "../../assets/officechair1.avif"
import woodentable1 from "../../assets/woodentable1.avif"
import bedroom2 from "../../assets/bedroom2.jpg"
import bookshelf1 from "../../assets/bookshelf1.webp"
import cofee from "../../assets/cofee.avif"

const NewArrivals = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)

  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: 1,
      name: "Modern Sofa Set",
      image: sofaset2,
      category: "living-room",
      badge: t("newArrivals.badges.new"),
      rating: 5.0,
      reviews: 124,
      arAvailable: true,
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      image: officechair1,
      category: "office",
      badge: t("newArrivals.badges.trending"),
      rating: 4.5,
      reviews: 89,
      arAvailable: true,
    },
    {
      id: 3,
      name: "Wooden Dining Table",
      image: woodentable1,
      category: "dining",
      badge: t("newArrivals.badges.popular"),
      rating: 5.0,
      reviews: 156,
      arAvailable: true,
    },
    {
      id: 4,
      name: "King Size Bed Frame",
      image: bedroom2,
      category: "bedroom",
      badge: t("newArrivals.badges.new"),
      rating: 4.5,
      reviews: 78,
      arAvailable: true,
    },
    {
      id: 5,
      name: "Bookshelf Unit",
      image: bookshelf1,
      category: "office",
      badge: t("newArrivals.badges.featured"),
      rating: 5.0,
      reviews: 45,
      arAvailable: true,
    },
    {
      id: 6,
      name: "Coffee Table Set",
      image: cofee,
      category: "living-room",
      badge: t("newArrivals.badges.new"),
      rating: 4.5,
      reviews: 92,
      arAvailable: true,
    },
  ]

  const categories = [
    { id: "all", label: t("newArrivals.categories.all") },
    { id: "living-room", label: t("newArrivals.categories.livingRoom") },
    { id: "bedroom", label: t("newArrivals.categories.bedroom") },
    { id: "office", label: t("newArrivals.categories.office") },
    { id: "dining", label: t("newArrivals.categories.dining") },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

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
    <section id="new-arrivals" className="section new-arrivals">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t("newArrivals.title")}</h2>
          <p className="section-subtitle">{t("newArrivals.subtitle")}</p>
        </motion.div>

        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`filter-tab ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={selectedCategory}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                <span className={`product-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>
                {product.arAvailable && <span className="ar-badge">🏠 AR</span>}
                <div className="product-actions">
                  <motion.button
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Add to Wishlist"
                  >
                    ❤️
                  </motion.button>
                  <motion.button
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Quick View"
                  >
                    👁️
                  </motion.button>
                  <motion.button
                    className="action-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Compare"
                  >
                    ⚖️
                  </motion.button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">
                    ({product.reviews} {t("newArrivals.reviews")})
                  </span>
                </div>
                <motion.button className="btn product-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {t("newArrivals.tryAR")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="app-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3>{t("newArrivals.cta.title")}</h3>
          <p>{t("newArrivals.cta.subtitle")}</p>
          <motion.button className="btn app-download-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span>📱</span>
            {t("newArrivals.cta.button")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewArrivals
