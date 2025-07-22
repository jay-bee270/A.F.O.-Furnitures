"use client"
import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
import { getTranslation } from "../../utils/translations"
import "./Contacts.css"

const ContactCTA = () => {
  const { currentLanguage } = useLanguage()
  const t = (key) => getTranslation(currentLanguage, key)

  const handleEmailClick = () => {
  const subject = encodeURIComponent("A.F.O. Furnitures App Inquiry")
  const body = encodeURIComponent("What's your enquiry?")
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=jubrilo2007@gmail.com&su=${subject}&body=${body}`

  window.open(gmailLink, "_blank", "noopener,noreferrer")
}


  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello! I'm interested in the A.F.O. Furnitures app and would like to know more about your furniture collection and AR features."
    )
    const whatsappLink = `https://wa.me/2348147355143?text=${message}`
    window.open(whatsappLink, "_blank", "noopener,noreferrer")
  }

  const handlePhoneClick = () => {
    window.location.href = "tel:+2348147355143"
  }

  return (
    <section id="contact" className="section contact-cta">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t("contact.title")}</h2>
          <p className="section-subtitle">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="cta-content">
          <motion.div
            className="cta-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2>{t("contact.cta.title")}</h2>
            <p>{t("contact.cta.description")}</p>

            <div className="cta-features">
              {[
                {
                  icon: "🎯",
                  titleKey: "contact.features.personalized.title",
                  descKey: "contact.features.personalized.description",
                  delay: 0.3
                },
                {
                  icon: "🌍",
                  titleKey: "contact.features.global.title",
                  descKey: "contact.features.global.description",
                  delay: 0.4
                },
                {
                  icon: "🔒",
                  titleKey: "contact.features.secure.title",
                  descKey: "contact.features.secure.description",
                  delay: 0.5
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="cta-feature"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  viewport={{ once: true }}
                >
                  <span className="feature-icon">{feature.icon}</span>
                  <div>
                    <h4>{t(feature.titleKey)}</h4>
                    <p>{t(feature.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-info">
              <h4>{t("contact.help.title")}</h4>
              <div className="contact-methods">
                <motion.div
                  className="contact-method"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePhoneClick}
                  style={{ cursor: "pointer" }}
                >
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>{t("contact.methods.phone.title")}</strong>
                    <p>+234-814-735-5143</p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-method"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmailClick}
                  style={{ cursor: "pointer" }}
                >
                  <span className="contact-icon">✉️</span>
                  <div>
                    <strong>{t("contact.methods.email.title")}</strong>
                    <p>jubrilo2007@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-method"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                  style={{ cursor: "pointer" }}
                >
                  <span className="contact-icon">💬</span>
                  <div>
                    <strong>{t("contact.methods.chat.title")}</strong>
                    <p>{t("contact.methods.chat.description")}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Reach out to us </h3>
            <p>Click one of this links 👇</p>

            <div className="contact-buttons">
              <motion.button
                className="contact-btn email-btn"
                onClick={handleEmailClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 {t("contact.buttons.email")}
              </motion.button>
              <motion.button
                className="contact-btn whatsapp-btn"
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 {t("contact.buttons.whatsapp")}
              </motion.button>
            </div>

            <div className="app-download-section">
              <h4>{t("contact.download.title")}</h4>
              <p>{t("contact.download.description")}</p>
              <motion.button
                className="btn app-download-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <span>📱</span> {t("contact.download.button")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
