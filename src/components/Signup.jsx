// components/Signup.jsx
import React, { useState } from 'react';
import '../components/styles/auth.css'
import { Notify } from 'notiflix';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return 'Weak';
      case 2:
      case 3: return 'Medium';
      case 4:
      case 5: return 'Strong';
      default: return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1: return '#ff4757';
      case 2:
      case 3: return '#ffa502';
      case 4:
      case 5: return '#2ed573';
      default: return '#ddd';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }

    // Validate terms agreement
    if (!agreedToTerms) {
      setError('Please agree to the Terms and Privacy Policy');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // For demonstration - in real app, handle tokens securely
        console.log('Registration successful:', data);
        Notify.success('Registration successful, you can Now Login')
       
        window.location.href = '/Login';
      } else {
        Notify.failure('Registration failed')
        setError(data.msg || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-bg">
        <div className="auth-bg-overlay"></div>
        <div className="floating-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
          <div className="floating-element element-4"></div>
          <div className="floating-element element-5"></div>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-card signup-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
            <div className="logo-icon" onClick={handleLoginRedirect}>
            <img src="/AUCALOGO.png" alt="AUCA Logo" className="logo-image" />
            </div>
              <h1 className="auth-title">Join CareerPath</h1>
            </div>
            <p className="auth-subtitle">Create your account to discover your future</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                <span className="error-icon"></span>
                {error}
              </div>
            )}

            <div className="form-group">
              
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="form-group">
              {/* <label htmlFor="email" className="form-label">
                Email Address
              </label> */}
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-group">
              {/* <label htmlFor="password" className="form-label">
                Password
              </label> */}
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{ 
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              {/* <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label> */}
              <div className="input-wrapper">
                <span className="input-icon">🔐</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="validation-message error">
                  Passwords do not match
                </div>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="validation-message success">
                  ✓ Passwords match
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="checkbox-wrapper terms-checkbox">
                <input 
                  type="checkbox" 
                  className="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span className="checkmark"></span>
                I agree to the terms and Privacy Policy
                {/* <button type="button" className="terms-link">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="terms-link">Privacy Policy</button> */}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className={`submit-btn ${loading ? 'loading' : ''} ${!agreedToTerms ? 'disabled' : ''}`}
            >
              {loading ? (
                <div className="loading-content">
                  <div className="spinner"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

       
          

          {/* Social Login */}
          <div className="social-login">
            {/* <button className="social-btn google-btn">
              <span className="social-icon">
                 <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
              </span>
              Sign up with Google
            </button> */}
            {/* <button className="social-btn microsoft-btn">
              <span className="social-icon">🔷</span>
              Sign up with Microsoft
            </button> */}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account?{'Login'}
              <button
                onClick={handleLoginRedirect}
                className="auth-link"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Signup };