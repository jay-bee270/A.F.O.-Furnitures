"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"
import "./Footer.css"

const Footer = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: t("footer.sections.appFeatures.title"),
      links: [
        { name: t("footer.sections.appFeatures.links.arPlanner"), href: "#features" },
        { name: t("footer.sections.appFeatures.links.comparison"), href: "#features" },
        { name: t("footer.sections.appFeatures.links.multiLanguage"), href: "#features" },
        { name: t("footer.sections.appFeatures.links.currency"), href: "#features" },
        { name: t("footer.sections.appFeatures.links.search"), href: "#features" },
      ],
    },
    {
      title: t("footer.sections.categories.title"),
      links: [
        { name: t("footer.sections.categories.links.livingRoom"), href: "#categories" },
        { name: t("footer.sections.categories.links.bedroom"), href: "#categories" },
        { name: t("footer.sections.categories.links.office"), href: "#categories" },
        { name: t("footer.sections.categories.links.diningRoom"), href: "#categories" },
        { name: t("footer.sections.categories.links.outdoor"), href: "#categories" },
      ],
    },
    {
      title: t("footer.sections.support.title"),
      links: [
        { name: t("footer.sections.support.links.helpCenter"), href: "#" },
        { name: t("footer.sections.support.links.tutorial"), href: "#" },
        { name: t("footer.sections.support.links.contact"), href: "#" },
        { name: t("footer.sections.support.links.faq"), href: "#" },
        { name: t("footer.sections.support.links.feedback"), href: "#testimonials" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "LinkedIn", icon: "💼", href: "#" },
    { name: "YouTube", icon: "📺", href: "#" },
  ]

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-shapes">
          <div className="footer-shape shape-1"></div>
          <div className="footer-shape shape-2"></div>
        </div>
      </div>

      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="footer-logo">
              <div className="logo-icon">
                <span>🏠</span>
              </div>
              <h3>A.F.O. Furnitures</h3>
            </div>
            <p>{t("footer.description")}</p>
            <div className="app-download">
              <motion.button className="btn download-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <span>📱</span>
                 Download App
              </motion.button>
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
            </div>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="footer-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            className="footer-newsletter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>{t("footer.newsletter.title")}</h4>
            <p>{t("footer.newsletter.subtitle")}</p>
            <div className="newsletter-form">
              <input type="email" placeholder={t("footer.newsletter.placeholder")} />
              <motion.button className="btn newsletter-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {t("footer.newsletter.subscribe")}
              </motion.button>
            </div>
            <div className="app-badges">
              <div className="badge-item">
                <span>⭐</span>
                <div>
                  <strong>4.8/5</strong>
                  <p>{t("footer.newsletter.rating")}</p>
                </div>
              </div>
              <div className="badge-item">
                <span>📱</span>
                <div>
                  <strong>50K+</strong>
                  <p>{t("footer.newsletter.downloads")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p>
              &copy; {currentYear} {t("footer.copyright")}
            </p>
            <div className="footer-links">
              <a href="#">{t("footer.links.privacy")}</a>
              <a href="#">{t("footer.links.terms")}</a>
              <a href="#">{t("footer.links.appStore")}</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
