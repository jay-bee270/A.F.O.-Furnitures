"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation } from "../../utils/translations";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Testimonials.css";

const Testimonials = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
    avatar: null,
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clickCounts, setClickCounts] = useState({});
  const [visibleDeleteButtons, setVisibleDeleteButtons] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          reviewsData.push({ id: doc.id, ...doc.data() });
        });
        reviewsData.sort((a, b) => b.date?.toDate() - a.date?.toDate());
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setSelectedAvatar(null);
    setAvatarPreview(null);
    const fileInput = document.getElementById("review-avatar");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.location || !newReview.review) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        name: newReview.name,
        location: newReview.location,
        rating: newReview.rating,
        review: newReview.review,
        avatar: avatarPreview || null,
        date: new Date(),
        verified: false,
      };

      // ✅ Add review to Firestore and get the document ID
      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      // ✅ Add the review with real Firestore ID so it renders properly
      setReviews((prev) => [
        { id: docRef.id, ...reviewData },
        ...prev,
      ]);

      setNewReview({ name: "", location: "", rating: 5, review: "", avatar: null });
      setSelectedAvatar(null);
      setAvatarPreview(null);
      setShowReviewForm(false);

      alert("Thank you for your review!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewClick = (id) => {
    const updatedCounts = {
      ...clickCounts,
      [id]: (clickCounts[id] || 0) + 1,
    };
    setClickCounts(updatedCounts);

    if (updatedCounts[id] >= 15) {
      setVisibleDeleteButtons((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      alert("Review deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete review. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="section testimonials">
        <div className="container">
          <div className="loading-spinner"> </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reviews.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => handleReviewClick(testimonial.id)}
            >
              <div className="testimonial-header">
                <img
                  src={testimonial.avatar || "/placeholder.jpg"}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
                <div className="testimonial-info">
                  <div className="name-verified">
                    <h4>{testimonial.name}</h4>
                    {testimonial.verified && <span className="verified-badge">✓</span>}
                  </div>
                  <p className="location">{testimonial.location}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? "star filled" : "star"}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="testimonial-text">"{testimonial.review}"</p>

              {visibleDeleteButtons[testimonial.id] && (
                <button onClick={() => handleDeleteReview(testimonial.id)} className="delete-button">
                  Delete Review
                </button>
              )}

              <div className="testimonial-footer">
                <span className="testimonial-date">
                  {testimonial.date?.toDate?.()?.toLocaleDateString() || "Recent"}
                </span>
                <span className="testimonial-source">{t("testimonials.appUser")}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="review-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="btn btn-outline"
            onClick={() => setShowReviewForm(!showReviewForm)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showReviewForm ? t("testimonials.cancel") : t("testimonials.shareExperience")}
          </motion.button>
        </motion.div>

        {showReviewForm && (
          <motion.div
            className="review-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className="review-form" onSubmit={handleSubmitReview}>
              <h3>{t("testimonials.form.title")}</h3>
              <p>{t("testimonials.form.subtitle")}</p>

              <div className="form-row">
                <input
                  type="text"
                  placeholder={t("testimonials.form.name")}
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder={t("testimonials.form.location")}
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  required
                />
              </div>

              <div className="rating-input">
                <label>{t("testimonials.form.rating")}</label>
                <div className="stars-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= newReview.rating ? "active" : ""}`}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ⭐
                    </motion.button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder={t("testimonials.form.review")}
                value={newReview.review}
                onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                required
                rows="4"
              />

              <div className="avatar-upload-section">
                <label>{t("testimonials.form.addAvatar")}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="avatar-input"
                  id="review-avatar"
                />
                <label htmlFor="review-avatar" className="image-upload-btn">
                  {t("testimonials.form.chooseAvatar")}
                </label>
                <p className="image-limit">{t("testimonials.form.maxImages")}</p>

                {avatarPreview && (
                  <div className="image-preview">
                    <img src={avatarPreview} alt="Preview" />
                    <button type="button" className="remove-image-btn" onClick={removeAvatar}>
                      ❌
                    </button>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                className="btn submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? t("common.loading") : t("testimonials.form.submit")}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
