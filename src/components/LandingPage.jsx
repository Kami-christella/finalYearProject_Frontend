// 📁 frontend/src/components/LandingPage.jsx 

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../localization/LocalizationContext'; 
import LanguageSwitcher from './LanguageSwitcher'; 
import '../components/styles/LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLocalization(); 
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        rootMargin: '0px 0px -100px 0px'
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
    const statElements = document.querySelectorAll('.stat-number');
    
    statElements.forEach((stat) => {
      const text = stat.textContent;
      const number = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/\d/g, '');
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
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle button click with ripple effect
  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
  <div className="logo-container">
    <div className="logo">CareerPath</div>
  </div>
  
  <div className="nav-center">
    <ul className="nav-links">
      <li><button onClick={() => smoothScroll('home')}>{t('nav.home')}</button></li>
      <li><button onClick={() => smoothScroll('features')}>{t('nav.features')}</button></li>
      <li><button onClick={() => smoothScroll('about')}>{t('nav.about')}</button></li>
      <li><button onClick={() => smoothScroll('contact')}>{t('nav.contact')}</button></li>
    </ul>
  </div>
  
  <div className="nav-actions">
    <button className="cta-btn" onClick={(e) => { handleButtonClick(e); navigate('Login'); }}>
      {t('nav.getStarted')}
    </button>
    <LanguageSwitcher />
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
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary pulse" 
              onClick={(e) => {
                handleButtonClick(e);
                navigate('Login')
              }}
            >
              {t('hero.startAssessment')}
            </button>
            <button 
              className="btn-secondary" 
              onClick={(e) => {
                handleButtonClick(e);
                smoothScroll('features');
              }}
            >
              {t('hero.learnMore')}
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
          <h2 className="section-title">{t('features.title')}</h2>
          <div className="features-grid">
            <FeatureCard
              icon="🎯"
              title={t('features.personalizedAssessment.title')}
              description={t('features.personalizedAssessment.description')}
            />
            
            <FeatureCard
              icon="📊"
              title={t('features.dataDrivenInsights.title')}
              description={t('features.dataDrivenInsights.description')}
            />
            
            <FeatureCard
              icon="🚀"
              title={t('features.careerRoadmap.title')}
              description={t('features.careerRoadmap.description')}
            />
            
            <FeatureCard
              icon="👥"
              title={t('features.expertGuidance.title')}
              description={t('features.expertGuidance.description')}
            />
            
            <FeatureCard
              icon="🎓"
              title={t('features.academicIntegration.title')}
              description={t('features.academicIntegration.description')}
            />
            
            <FeatureCard
              icon="📱"
              title={t('features.mobileExperience.title')}
              description={t('features.mobileExperience.description')}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <StatItem number="50K+" label={t('stats.studentsAssessed')} />
            <StatItem number="200+" label={t('stats.careerPaths')} />
            <StatItem number="95%" label={t('stats.accuracyRate')} />
            <StatItem number="24/7" label={t('stats.supportAvailable')} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="signup">
        <div className="container">
          <h2 className="cta-title">{t('cta.title')}</h2>
          <p className="cta-description">
            {t('cta.description')}
          </p>
          <button 
            className="btn-primary cta-large" 
            onClick={(e) => {
              handleButtonClick(e);
              navigate('Login');
            }}
          >
            {t('cta.startJourney')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CareerPath</h3>
            <p>{t('footer.description')}</p>
          </div>
          <div className="footer-section">
            <h3>{t('footer.quickLinks')}</h3>
            <div className="footer-links">
              <button onClick={() => smoothScroll('home')}>{t('nav.home')}</button>
              <button onClick={() => smoothScroll('features')}>{t('nav.features')}</button>
              <button onClick={() => smoothScroll('about')}>{t('nav.about')}</button>
              <button onClick={() => smoothScroll('contact')}>{t('nav.contact')}</button>
            </div>
          </div>
          <div className="footer-section">
            <h3>{t('footer.support')}</h3>
            <div className="footer-links">
              <button onClick={() => smoothScroll('help')}>{t('footer.helpCenter')}</button>
              <button onClick={() => smoothScroll('faq')}>{t('footer.faq')}</button>
              <button onClick={() => smoothScroll('privacy')}>{t('footer.privacyPolicy')}</button>
              <button onClick={() => smoothScroll('terms')}>{t('footer.termsOfService')}</button>
            </div>
          </div>
          <div className="footer-section">
            <h3>{t('footer.contactInfo')}</h3>
            <p>{t('footer.email')}</p>
            <p>{t('footer.phone')}</p>
            <p>{t('footer.address')}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
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
      className={`feature-card glass ${isHovered ? 'hovered' : ''}`}
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