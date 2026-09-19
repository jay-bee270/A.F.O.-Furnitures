"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"
import "./NewArrivals.css"
import { useCart } from "../../contexts/CartContext"

import sofaset2 from "../../assets/sofaset2.webp"
import officechair1 from "../../assets/officechair1.avif"
import woodentable1 from "../../assets/woodentable1.avif"
import bedroom2 from "../../assets/bedroom2.jpg"
import bookshelf1 from "../../assets/bookshelf1.webp"
import cofee from "../../assets/cofee.avif"

const NewArrivals = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)
  const { addItem } = useCart()

  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const onShop = (e) => setSelectedCategory(e.detail)
    window.addEventListener("shop-category", onShop)
    return () => window.removeEventListener("shop-category", onShop)
  }, [])

  const products = [
    {
      id: 1,
      name: "Modern Sofa Set",
      price: 450000,
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
      price: 85000,
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
      price: 220000,
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
      price: 300000,
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
      price: 60000,
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
      price: 75000,
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
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Browse our latest furniture and order online</p>
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
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">₦{product.price.toLocaleString()}</p>
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
                <div className="product-buttons">
                  <motion.button
                    className="btn product-btn add-cart-btn"
                    onClick={() => addItem(product)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    🛒 Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default NewArrivals