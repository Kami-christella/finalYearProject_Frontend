// // components/Login.jsx
// import React, { useState } from 'react';
// import '../components/styles/auth.css'
// import { Notify } from 'notiflix';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:5000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Store token and user data
//         // Note: In a real application, consider using secure storage
//         const userData = {
//           id: data._id,
//           name: data.name,
//           email: data.email,
//           role: data.role
//         };
        
//         // For demonstration - in real app, handle tokens securely
//         console.log('Login successful:', userData);
//         Notify.success('Login successful')
//         // Redirect to StudentProfile
//         window.location.href = '/StudentProfile';
//       } else {
//         Notify.failure('Login failed')
//         setError(data.msg || 'Login failed');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackToHome = () => {
//     window.location.href = '/';
//   };

//   const handleSignupRedirect = () => {
//     window.location.href = '/signup';
//   };

//   return (
//     <div className="auth-container">
//       {/* Animated Background */}
//       <div className="auth-bg">
//         <div className="auth-bg-overlay"></div>
//         <div className="floating-elements">
//           <div className="floating-element element-1"></div>
//           <div className="floating-element element-2"></div>
//           <div className="floating-element element-3"></div>
//           <div className="floating-element element-4"></div>
//           <div className="floating-element element-5"></div>
//         </div>
//       </div>

//       <div className="auth-content">
//         <div className="auth-card">
//           {/* Header */}
//           <div className="auth-header">
//             <div className="auth-logo">
//               <div className="logo-icon">🎯</div>
//               <h1 className="auth-title">Welcome Back</h1>
//             </div>
//             <p className="auth-subtitle">Sign in to continue your career journey</p>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="auth-form">
//             {error && (
//               <div className="error-message">
//                 <span className="error-icon">⚠️</span>
//                 {error}
//               </div>
//             )}

//             <div className="form-group">
//               <label htmlFor="email" className="form-label">
//                 Email Address
//               </label>
//               <div className="input-wrapper">
//                 <span className="input-icon">📧</span>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <div className="input-wrapper">
//                 <span className="input-icon">🔒</span>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? '👁️' : '👁️‍🗨️'}
//                 </button>
//               </div>
//             </div>

//             <div className="form-options">
//               <label className="checkbox-wrapper">
//                 <input type="checkbox" className="checkbox" />
//                 <span className="checkmark"></span>
//                 Remember me
//               </label>
//               <button type="button" className="forgot-password">
//                 Forgot password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`submit-btn ${loading ? 'loading' : ''}`}
//             >
//               {loading ? (
//                 <div className="loading-content">
//                   <div className="spinner"></div>
//                   Signing in...
//                 </div>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="auth-divider">
//             <span>or</span>
//           </div>

//           {/* Social Login */}
//           <div className="social-login">
//             <button className="social-btn google-btn">
//               <span className="social-icon">🔴</span>
//               Continue with Google
//             </button>
//             <button className="social-btn microsoft-btn">
//               <span className="social-icon">🔷</span>
//               Continue with Microsoft
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="auth-footer">
//             <p className="auth-footer-text">
//               Don't have an account?{' '}
//               <button
//                 onClick={handleSignupRedirect}
//                 className="auth-link"
//               >
//                 Sign up here
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Back to Home */}
//         <button
//           onClick={handleBackToHome}
//           className="back-home-btn"
//         >
//           <span className="back-icon">←</span>
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export { Login };


// components/Login.jsx
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
        // ✅ FIXED: Now properly storing token and user data
        
        // Store the authentication token
        localStorage.setItem('token', data.token);
        
        // Store user data
        const userData = {
          id: data._id || data.user?.id,
          name: data.name || data.user?.name,
          email: data.email || data.user?.email,
          role: data.role || data.user?.role
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Optional: Store additional profile info if available
        if (data.profileCompleted) {
          localStorage.setItem('profileCompleted', 'true');
        }
        
        if (data.profileId) {
          localStorage.setItem('profileId', data.profileId);
        }
        
        console.log('Login successful:', userData);
        console.log('Token stored:', data.token);
        
        Notify.success('Login successful! Redirecting to profile...');
        
        // Small delay to show notification before redirect
        setTimeout(() => {
          window.location.href = '/StudentProfile';
        }, 1000);
        
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

  // ✅ ADDED: Function to check current stored data (for debugging)
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
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">🎯</div>
              <h1 className="auth-title">Welcome Back</h1>
            </div>
            <p className="auth-subtitle">Sign in to continue your career journey</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
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
              type="submit"
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
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Social Login */}
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

          {/* Footer */}
          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account?{' '}
              <button
                onClick={handleSignupRedirect}
                className="auth-link"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
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

// ✅ ADDED: Utility functions for token management
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
  
  // Clear all stored data (for logout)
  clearStorage: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('profileId');
  },
  
  // Get authorization header for API calls
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};

export { Login };