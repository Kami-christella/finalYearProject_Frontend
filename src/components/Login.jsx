// components/Login.jsx - UPDATED WITH ADVISOR REDIRECT
import React, { useState } from 'react';
import '../components/styles/auth.css'
import { Notify } from 'notiflix';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // UPDATED: Enhanced redirect logic based on user role
  const redirectBasedOnRole = async (userData, token) => {
    const userRole = userData.role || userData.userRole;
    
    console.log('🔍 User role detected:', userRole);
    console.log('👤 User data:', userData);

    // Check user role and redirect accordingly
    switch (userRole) {
      case 'admin':
      case 'advisor':
        console.log('👨‍🏫 Redirecting advisor/admin to dashboard...');
        Notify.success(`Welcome back, ${userData.name}! Redirecting to advisor dashboard...`);
        
        setTimeout(() => {
          window.location.href = '/advisorDashboard';
        }, 1500);
        break;

      case 'student':
        console.log('👨‍🎓 Student detected, checking profile...');
        await checkStudentProfileAndRedirect(token, userData);
        break;

      default:
        console.log('❓ Unknown role, treating as student...');
        await checkStudentProfileAndRedirect(token, userData);
        break;
    }
  };

  // UPDATED: Function to check student profile and redirect accordingly
  const checkStudentProfileAndRedirect = async (token, userData) => {
    try {
      console.log('🔍 Checking if student has a profile...');
      
      const response = await fetch('http://localhost:5000/api/student/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Student has a profile - redirect to student dashboard
        const profileData = await response.json();
        console.log('✅ Student has profile, redirecting to student dashboard');
        
        // Store profile completion status
        localStorage.setItem('profileCompleted', 'true');
        if (profileData.profile?._id) {
          localStorage.setItem('profileId', profileData.profile._id);
        }
        
        Notify.success(`Welcome back, ${userData.name}! Redirecting to your dashboard...`);
        
        setTimeout(() => {
          window.location.href = '/ProfileDashboard';
        }, 1500);
        
      } else if (response.status === 404) {
        // Student doesn't have a profile - redirect to create profile
        console.log('📝 Student needs to create profile');
        
        localStorage.setItem('profileCompleted', 'false');
        
        Notify.info(`Welcome ${userData.name}! Please complete your profile to continue...`);
        
        setTimeout(() => {
          window.location.href = '/studentprofile';
        }, 1500);
        
      } else {
        // Some other error - redirect to create profile as fallback
        console.log('⚠️ Error checking profile, redirecting to create profile');
        
        Notify.warning('Please complete your profile to continue...');
        
        setTimeout(() => {
          window.location.href = '/studentprofile';
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Error checking student profile:', error);
      
      // Fallback - redirect to create profile
      Notify.warning('Redirecting to profile creation...');
      
      setTimeout(() => {
        window.location.href = '/studentprofile';
      }, 1500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Store the authentication token
        localStorage.setItem('token', data.token);
        
        // Store user data with comprehensive role handling
        const userData = {
          id: data._id || data.user?.id,
          name: data.name || data.user?.name,
          email: data.email || data.user?.email,
          role: data.role || data.user?.role || data.userRole // Handle different role field names
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Store additional data if available
        if (data.profileCompleted) {
          localStorage.setItem('profileCompleted', 'true');
        }
        
        if (data.profileId) {
          localStorage.setItem('profileId', data.profileId);
        }
        
        console.log('✅ Login successful:', userData);
        console.log('🔑 Token stored:', data.token);
        
        Notify.success('Login successful! Redirecting...');
        
        // UPDATED: Redirect based on user role
        await redirectBasedOnRole(userData, data.token);
        
      } else {
        Notify.failure(data.msg || 'Login failed');
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.';
      Notify.failure(errorMessage);
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleSignupRedirect = () => {
    window.location.href = '/signup';
  };

  // Function to check current stored data (for debugging)
  const checkStoredData = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('Current stored token:', token);
    console.log('Current stored user:', user);
    
    if (token) {
      Notify.info('Token found in localStorage!');
    } else {
      Notify.warning('No token found in localStorage');
    }
  };

  return (
    <div className="auth-container">
      {/* Your existing JSX remains the same */}
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
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">🎯</div>
              <h1 className="auth-title">Welcome Back</h1>
            </div>
            <p className="auth-subtitle">Sign in to continue your career journey</p>
          </div>
          
          <div className="auth-form">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
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
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                <div className="loading-content">
                  <div className="spinner"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="social-btn google-btn">
              <span className="social-icon">🔴</span>
              Continue with Google
            </button>
            <button className="social-btn microsoft-btn">
              <span className="social-icon">🔷</span>
              Continue with Microsoft
            </button>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don`&lsquo;`t have an account?{' '}
              <button
                onClick={handleSignupRedirect}
                className="auth-link"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        <button
          onClick={handleBackToHome}
          className="back-home-btn"
        >
          <span className="back-icon">←</span>
          Back to Home
        </button>
      </div>
    </div>
  );
};

// UPDATED: Enhanced utility functions for role-based navigation
export const tokenUtils = {
  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Get stored user data
  getUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },
  
  // Get user role
  getUserRole: () => {
    const user = tokenUtils.getUser();
    return user?.role || user?.userRole || 'student';
  },
  
  // Check if user is advisor or admin
  isAdvisorOrAdmin: () => {
    const role = tokenUtils.getUserRole();
    return role === 'advisor' || role === 'admin';
  },
  
  // Check if user is student
  isStudent: () => {
    const role = tokenUtils.getUserRole();
    return role === 'student' || !role; // Default to student if no role
  },
  
  // Clear all stored data (for logout)
  clearStorage: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('profileId');
    localStorage.removeItem('assessmentCompleted');
    localStorage.removeItem('hasRecommendations');
  },
  
  // Get authorization header for API calls
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  // UPDATED: Check if user has profile (for students only)
  checkUserProfile: async () => {
    try {
      const token = tokenUtils.getToken();
      if (!token) return null;

      // Only check profile for students
      if (!tokenUtils.isStudent()) {
        return { hasProfile: true, isAdvisor: true };
      }

      const response = await fetch('http://localhost:5000/api/student/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { hasProfile: true, profile: data.profile };
      } else if (response.status === 404) {
        return { hasProfile: false }; // No profile exists
      } else {
        throw new Error('Failed to check profile');
      }
    } catch (error) {
      console.error('Error checking user profile:', error);
      return { hasProfile: false, error: true };
    }
  },

  // ADDED: Redirect user to appropriate dashboard based on role
  redirectToDashboard: async () => {
    const role = tokenUtils.getUserRole();
    
    switch (role) {
      case 'admin':
      case 'advisor':
        window.location.href = '/advisorDashboard';
        break;
      case 'student':
      default:
        const profileCheck = await tokenUtils.checkUserProfile();
        if (profileCheck?.hasProfile) {
          window.location.href = '/ProfileDashboard';
        } else {
          window.location.href = '/studentprofile';
        }
        break;
    }
  }
};

// ADDED: Route protection utility
export const routeProtection = {
  // Check if current user can access advisor routes
  canAccessAdvisorRoutes: () => {
    return tokenUtils.isAdvisorOrAdmin();
  },
  
  // Check if current user can access student routes
  canAccessStudentRoutes: () => {
    return tokenUtils.isStudent();
  },
  
  // Redirect unauthorized users
  redirectIfUnauthorized: (requiredRole = 'student') => {
    if (!tokenUtils.isAuthenticated()) {
      window.location.href = '/login';
      return false;
    }
    
    const userRole = tokenUtils.getUserRole();
    
    if (requiredRole === 'advisor' && !tokenUtils.isAdvisorOrAdmin()) {
      window.location.href = '/ProfileDashboard'; // Redirect students to their dashboard
      return false;
    }
    
    if (requiredRole === 'student' && !tokenUtils.isStudent()) {
      window.location.href = '/advisorDashboard'; // Redirect advisors to their dashboard
      return false;
    }
    
    return true;
  }
};

export { Login };