"use client"

import { motion } from "framer-motion"
import "./Hero.css"
import furniture from "../../assets/furniture3.webp"

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

const Hero = () => {
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
            <span>🛋️ Shop furniture online</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Shop Quality Furniture <span className="gradient-text">For Every Room</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Browse sofas, beds, dining tables and office furniture, then check out securely online.
          </motion.p>

          <motion.div className="hero-buttons" variants={itemVariants}>
            <button className="btn btn-primary" onClick={() => scrollTo("new-arrivals")}>
              <span>🛒</span>
              Shop Now
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo("categories")}>
              <span>🔍</span>
              Browse Categories
            </button>
          </motion.div>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat">
              <h3>6</h3>
              <p>Room categories</p>
            </div>
            <div className="stat">
              <h3>Secure</h3>
              <p>Paystack payments</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>Shop online</p>
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
            <img src={furniture || "/placeholder.svg"} alt="A.F.O. Furnitures store" className="hero-img" />
            <div className="floating-card card-1">
              <div className="card-icon">💳</div>
              <div className="card-content">
                <h4>Secure Checkout</h4>
                <p>Pay with Paystack</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🛋️</div>
              <div className="card-content">
                <h4>New Arrivals</h4>
                <p>Shop the latest</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero