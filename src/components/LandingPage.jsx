// 📁 frontend/src/components/LandingPage.jsx

import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLocalization } from "../localization/LocalizationContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "../components/styles/LandingPage.css";
import { useNavigate, Link } from "react-router-dom";

const LandingPage = () => {
  const { t } = useLocalization();
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const navigate = useNavigate();
  
  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle stats animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true);
            animateStats();
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [statsAnimated]);

  // Animate stats numbers
  const animateStats = () => {
    const statElements = document.querySelectorAll(".stat-number");

    statElements.forEach((stat) => {
      const text = stat.textContent;
      const number = parseInt(text.replace(/\D/g, ""));
      const suffix = text.replace(/\d/g, "");
      let current = 0;
      const increment = number / 50;

      const updateCounter = () => {
        if (current < number) {
          current += increment;
          stat.textContent = Math.ceil(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = text;
        }
      };

      updateCounter();
    });
  };

  // Smooth scroll function
  const smoothScroll = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle button click with ripple effect
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.className = "ripple";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message (you can implement a toast notification)
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
        <div className="logo">
          <img src="/AUCALOGO.png" alt="AUCA Logo" className="logo-image" />
        </div>

          <div className="logo-container"> 
            <div className="logo">CareerPath</div>
          </div>

          <div className="nav-center">
            <ul className="nav-links">
              <li>
                <button onClick={() => smoothScroll("home")}>
                  {t("nav.home")}
                </button>
              </li>
              <li>
                <button onClick={() => smoothScroll("features")}>
                  {t("nav.features")}
                </button>
              </li>
              <li>
                <button onClick={() => smoothScroll("about")}>
                  {t("nav.about")}
                </button>
              </li>
              <li>
                <button onClick={() => smoothScroll("contact")}>
                  {t("nav.contact")}
                </button>
              </li>
            </ul>
          </div>

          <div className="nav-actions">
            <button
              className="cta-btn"
              onClick={(e) => {
                handleButtonClick(e);
                navigate("Login");
              }}
            >
              {t("nav.getStarted")}
            </button>
            <div className="language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="floating-cards">
          <div className="floating-card"></div>
          <div className="floating-card"></div>
          <div className="floating-card"></div>
          <div className="floating-card"></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-subtitle">{t("hero.subtitle")}</p>
          <div className="hero-buttons">
            <button
              className="btn-primary pulse"
              onClick={(e) => {
                handleButtonClick(e);
                navigate("Login");
              }}
            >
              {t("hero.startAssessment")}
            </button>
            <button
              className="btn-secondary"
              onClick={(e) => {
                handleButtonClick(e);
                smoothScroll("features");
              }}
            >
              {t("hero.learnMore")}
            </button>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-titles">{t("features.title")}</h2>
          <div className="features-grid">
            <FeatureCard
              icon="🎯"
              title={t("features.personalizedAssessment.title")}
              description={t("features.personalizedAssessment.description")}
            />

            <FeatureCard
              icon="📊"
              title={t("features.dataDrivenInsights.title")}
              description={t("features.dataDrivenInsights.description")}
            />

            <FeatureCard
              icon="🚀"
              title={t("features.careerRoadmap.title")}
              description={t("features.careerRoadmap.description")}
            />

            <FeatureCard
              icon="👥"
              title={t("features.expertGuidance.title")}
              description={t("features.expertGuidance.description")}
            />

            <FeatureCard
              icon="🎓"
              title={t("features.academicIntegration.title")}
              description={t("features.academicIntegration.description")}
            />

            <FeatureCard
              icon="📱"
              title={t("features.mobileExperience.title")}
              description={t("features.mobileExperience.description")}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-titles">About CareerPath</h2>
              <div className="about-description">
                <p>
                  CareerPath is an innovative career guidance platform developed specifically for AUCA students. 
                  Our mission is to bridge the gap between academic learning and professional success by providing 
                  personalized career assessments, data-driven insights, and expert guidance. <br/>
                  Founded with the vision of empowering students to make informed career decisions, we combine 
                  cutting-edge technology with proven career counseling methodologies to deliver tailored 
                  recommendations that align with each student's unique strengths, interests, and aspirations.<br/>
                   Our platform serves thousands of students across various disciplines, helping them discover 
                  their ideal career paths and develop the skills needed to succeed in today's competitive job market.
                </p>
               
              </div>
              
              {/* <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">🎯</div>
                  <div className="about-feature-content">
                    <h3>Personalized Approach</h3>
                    <p>Every assessment is tailored to your unique profile and academic background.</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <div className="about-feature-icon">📈</div>
                  <div className="about-feature-content">
                    <h3>Data-Driven Results</h3>
                    <p>Our recommendations are based on comprehensive data analysis and industry trends.</p>
                  </div>
                </div>
                
                <div className="about-feature">
                  <div className="about-feature-icon">🤝</div>
                  <div className="about-feature-content">
                    <h3>Expert Support</h3>
                    <p>Get guidance from experienced career counselors and industry professionals.</p>
                  </div>
                </div>
              </div> */}
            </div>
            
            {/* <div className="about-visual">
              <div className="about-image-placeholder">
                <div className="about-stats">
                  <div className="about-stat">
                    <span className="about-stat-number">5+</span>
                    <span className="about-stat-label">Years Experience</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-number">50K+</span>
                    <span className="about-stat-label">Students Helped</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat-number">95%</span>
                    <span className="about-stat-label">Success Rate</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <StatItem number="50K+" label={t("stats.studentsAssessed")} />
            <StatItem number="200+" label={t("stats.careerPaths")} />
            <StatItem number="95%" label={t("stats.accuracyRate")} />
            <StatItem number="24/7" label={t("stats.supportAvailable")} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-titles">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-details">
                    <h4>Address</h4>
                    <p>Adventist University of Central Africa<br />Kigali, Rwanda</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p> +250 724796998</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>www.auca.ac.rw</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">🕒</div>
                  <div className="contact-details">
                    <h4>Office Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <h3>Send us a Message</h3>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    rows="5"
                    className="form-textarea"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary form-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="signup">
        <div className="container">
          <h2 className="cta-titles">{t("cta.title")}</h2>
          <p className="cta-description">{t("cta.description")}</p>
          <button
            className="btn-primary cta-large"
            onClick={(e) => {
              handleButtonClick(e);
              navigate("Login");
            }}
          >
            {t("cta.startJourney")}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CareerPath</h3>
            <p>{t("footer.description")}</p>
          </div>
          <div className="footer-section">
            <h3>{t("footer.quickLinks")}</h3>
            <div className="footer-links">
              <button onClick={() => smoothScroll("home")}>
                {t("nav.home")}
              </button>
              <button onClick={() => smoothScroll("features")}>
                {t("nav.features")}
              </button>
              <button onClick={() => smoothScroll("about")}>
                {t("nav.about")}
              </button>
              <button onClick={() => smoothScroll("contact")}>
                {t("nav.contact")}
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h3>{t("footer.support")}</h3>
            <div className="footer-links">
              <button onClick={() => smoothScroll("help")}>
                {t("footer.helpCenter")}
              </button>
              <button onClick={() => smoothScroll("faq")}>
                {t("footer.faq")}
              </button>
              <button onClick={() => smoothScroll("privacy")}>
                {t("footer.privacyPolicy")}
              </button>
              <button onClick={() => smoothScroll("terms")}>
                {t("footer.termsOfService")}
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h3>{t("footer.contactInfo")}</h3>
            <p>{t("footer.email")}</p>
            <p>{t("footer.phone")}</p>
            <p>{t("footer.address")}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`feature-card glass ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

// PropTypes validation for FeatureCard
FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Stat Item Component
const StatItem = ({ number, label }) => {
  return (
    <div className="stat-item">
      <span className="stat-number">{number}</span>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// PropTypes validation for StatItem
StatItem.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LandingPage;