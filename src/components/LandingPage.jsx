// import React from 'react';
// import ''

// const LandingPage = () => {
//   const handleSignUp = () => {
//     // Navigate to signup - you'll implement this with your router
//     window.location.href = '/signup';
//   };

//   const handleLogin = () => {
//     // Navigate to login - you'll implement this with your router
//     window.location.href = '/login';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
//       {/* Hero Section */}
//       <div className="relative min-h-screen flex items-center justify-center">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }}></div>
//         </div>

//         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//           {/* Logo/Title */}
//           <div className="mb-8">
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
//               🎓 AUCA
//             </h1>
//             <h2 className="text-2xl md:text-4xl font-semibold text-blue-200 mb-2">
//               Career Guidance System
//             </h2>
//             <p className="text-lg md:text-xl text-blue-100">
//               Discover Your Perfect Career Path with AI-Powered Recommendations
//             </p>
//           </div>

//           {/* Features */}
//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
//               <div className="text-4xl mb-4">📋</div>
//               <h3 className="text-xl font-semibold text-white mb-2">Complete Profile</h3>
//               <p className="text-blue-100">Create your detailed student profile with academic background and interests</p>
//             </div>
            
//             <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
//               <div className="text-4xl mb-4">🧠</div>
//               <h3 className="text-xl font-semibold text-white mb-2">Smart Assessment</h3>
//               <p className="text-blue-100">Take our comprehensive career, skills, and personality assessment</p>
//             </div>
            
//             <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20">
//               <div className="text-4xl mb-4">🤖</div>
//               <h3 className="text-xl font-semibold text-white mb-2">AI Recommendations</h3>
//               <p className="text-blue-100">Get personalized faculty and career recommendations powered by AI</p>
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
//             <button 
//               onClick={handleSignUp}
//               className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               🚀 Get Started - Sign Up
//             </button>
            
//             <button 
//               onClick={handleLogin}
//               className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
//             >
//               👤 Already have an account? Login
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-white">1000+</div>
//               <div className="text-blue-200">Students Guided</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-white">50+</div>
//               <div className="text-blue-200">Career Paths</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-white">95%</div>
//               <div className="text-blue-200">Accuracy Rate</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-white">24/7</div>
//               <div className="text-blue-200">AI Support</div>
//             </div>
//           </div>
//         </div>

//         {/* Floating Animation */}
//         <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400 bg-opacity-20 rounded-full animate-bounce"></div>
//         <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-400 bg-opacity-20 rounded-full animate-pulse"></div>
//         <div className="absolute top-1/2 right-20 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-ping"></div>
//       </div>

//       {/* How It Works Section */}
//       <div className="bg-white py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
//             How It Works
//           </h2>
          
//           <div className="grid md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
//                 1
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
//               <p className="text-gray-600">Create your account and get started with your career journey</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
//                 2
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Complete Profile</h3>
//               <p className="text-gray-600">Fill out your academic background, interests, and upload documents</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
//                 3
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Take Assessment</h3>
//               <p className="text-gray-600">Complete our comprehensive career and personality assessment</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
//                 4
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Get Recommendations</h3>
//               <p className="text-gray-600">Receive AI-powered faculty and career recommendations</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <h3 className="text-2xl font-bold mb-4">Ready to Discover Your Future?</h3>
//           <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
//             Join thousands of students who have found their perfect career path through our AI-powered guidance system.
//           </p>
//           <button 
//             onClick={handleSignUp}
//             className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300"
//           >
//             Start Your Journey Today →
//           </button>
          
//           <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
//             <p>&copy; 2025 AUCA Career Guidance System. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../components/styles/LandingPage.css'
// import LandingPage from './LandingPage';

const LandingPage = () => {
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
          <div className="logo">CareerPath</div>
          <ul className="nav-links">
            <li><button onClick={() => smoothScroll('home')}>Home</button></li>
            <li><button onClick={() => smoothScroll('features')}>Features</button></li>
            <li><button onClick={() => smoothScroll('about')}>About</button></li>
            <li><button onClick={() => smoothScroll('contact')}>Contact</button></li>
          </ul>
          <button 
            className="cta-btn" 
            onClick={(e) => {
              handleButtonClick(e);
              smoothScroll('signup');
            }}
          >
            Get Started
          </button>
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
          <h1 className="hero-title">Discover Your Perfect Career Path</h1>
          <p className="hero-subtitle">
            Take our comprehensive career assessment and unlock your potential with personalized recommendations tailored to your unique skills and interests.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary pulse" 
              onClick={(e) => {
                handleButtonClick(e);
                smoothScroll('assessment');
              }}
            >
              Start Assessment
            </button>
            <button 
              className="btn-secondary" 
              onClick={(e) => {
                handleButtonClick(e);
                smoothScroll('features');
              }}
            >
              Learn More
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
          <h2 className="section-title">Why Choose CareerPath?</h2>
          <div className="features-grid">
            <FeatureCard
              icon="🎯"
              title="Personalized Assessment"
              description="Our advanced algorithm analyzes your skills, interests, and personality to provide tailored career recommendations that match your unique profile."
            />
            
            <FeatureCard
              icon="📊"
              title="Data-Driven Insights"
              description="Get detailed analytics about market trends, salary expectations, and growth opportunities in your recommended career fields."
            />
            
            <FeatureCard
              icon="🚀"
              title="Career Roadmap"
              description="Receive a step-by-step plan with education requirements, skill development paths, and actionable next steps to achieve your career goals."
            />
            
            <FeatureCard
              icon="👥"
              title="Expert Guidance"
              description="Connect with career counselors and industry professionals who can provide mentorship and guidance throughout your journey."
            />
            
            <FeatureCard
              icon="🎓"
              title="Academic Integration"
              description="Seamlessly integrate with your academic profile to align your studies with your career aspirations and maximize your potential."
            />
            
            <FeatureCard
              icon="📱"
              title="Mobile-First Experience"
              description="Access your career dashboard, take assessments, and track progress anywhere with our responsive, mobile-optimized platform."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <StatItem number="50K+" label="Students Assessed" />
            <StatItem number="200+" label="Career Paths" />
            <StatItem number="95%" label="Accuracy Rate" />
            <StatItem number="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="signup">
        <div className="container">
          <h2 className="cta-title">Ready to Shape Your Future?</h2>
          <p className="cta-description">
            Join thousands of students who have discovered their perfect career path through our comprehensive assessment platform.
          </p>
          <button 
            className="btn-primary cta-large" 
            onClick={(e) => {
              handleButtonClick(e);
              smoothScroll('assessment');
            }}
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CareerPath</h3>
            <p>Empowering students to discover their ideal career paths through innovative assessment technology and personalized guidance.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <button onClick={() => smoothScroll('home')}>Home</button>
              <button onClick={() => smoothScroll('features')}>Features</button>
              <button onClick={() => smoothScroll('about')}>About Us</button>
              <button onClick={() => smoothScroll('contact')}>Contact</button>
            </div>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <div className="footer-links">
              <button onClick={() => smoothScroll('help')}>Help Center</button>
              <button onClick={() => smoothScroll('faq')}>FAQ</button>
              <button onClick={() => smoothScroll('privacy')}>Privacy Policy</button>
              <button onClick={() => smoothScroll('terms')}>Terms of Service</button>
            </div>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p>Email: support@careerpath.com</p>
            <p>Phone: +250 788 123 456</p>
            <p>Address: Kigali, Rwanda</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CareerPath. All rights reserved. Made with ❤️ for students worldwide.</p>
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