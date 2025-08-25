// // components/Login.jsx - Updated with Google Sign-In
// import React, { useState, useEffect } from 'react';
// import '../components/styles/auth.css';
// import { Notify } from 'notiflix';
// import aucaLogo from '/AUCALOGO.png';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [googleLoading, setGoogleLoading] = useState(false);


//   const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

//   // Initialize Google Sign-In
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       if (window.google && GOOGLE_CLIENT_ID !== "800358726952-lqihldijgthlltjqcnsqgq36rb88rqkh.apps.googleusercontent.com") {
//         window.google.accounts.id.initialize({
//           client_id: GOOGLE_CLIENT_ID,
//           callback: handleGoogleResponse
//         });
//       }
//     };

//     // Add CSS for spinner animation
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//       }
//       .google-spinner {
//         width: 20px;
//         height: 20px;
//         border: 2px solid #f3f3f3;
//         border-top: 2px solid #4285f4;
//         border-radius: 50%;
//         animation: spin 1s linear infinite;
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       if (script.parentNode) {
//         script.parentNode.removeChild(script);
//       }
//       if (style.parentNode) {
//         style.parentNode.removeChild(style);
//       }
//     };
//   }, []);

//   // Parse JWT token from Google
//   const parseJwt = (token) => {
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join('')
//       );
//       return JSON.parse(jsonPayload);
//     } catch (error) {
//       console.error('Error parsing JWT:', error);
//       return null;
//     }
//   };

//   // Handle Google Sign-In response
//   const handleGoogleResponse = async (response) => {
//     setGoogleLoading(true);
//     setError('');

//     try {
//       const userInfo = parseJwt(response.credential);
      
//       if (!userInfo) {
//         throw new Error('Failed to parse Google user information');
//       }

//       console.log('🔍 Google user info:', userInfo);

//       // Send Google user data to your backend
//       const loginResponse = await fetch('http://localhost:5000/api/auth/google', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           googleToken: response.credential,
//           email: userInfo.email,
//           name: userInfo.name,
//           picture: userInfo.picture,
//           googleId: userInfo.sub,
//           given_name: userInfo.given_name,
//           family_name: userInfo.family_name
//         })
//       });

//       const data = await loginResponse.json();

//       if (loginResponse.ok) {
//         // Store  authentication token
//         localStorage.setItem('token', data.token);
        
//         // Store user data with comprehensive role handling
//         const userData = {
//           id: data._id || data.user?.id || userInfo.sub,
//           name: data.name || data.user?.name || userInfo.name,
//           email: data.email || data.user?.email || userInfo.email,
//           role: data.role || data.user?.role || data.userRole || 'student',
//           picture: userInfo.picture,
//           authMethod: 'google'
//         };
        
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('authMethod', 'google');
        
//         // Store additional data if available
//         if (data.profileCompleted) {
//           localStorage.setItem('profileCompleted', 'true');
//         }
        
//         if (data.profileId) {
//           localStorage.setItem('profileId', data.profileId);
//         }
        
//         console.log('✅ Google login successful:', userData);
//         console.log('🔑 Token stored:', data.token);
        
//         Notify.success(`Welcome ${userData.name}! Signing you in...`);
        
//         // Redirect based on user role
//         await redirectBasedOnRole(userData, data.token);
        
//       } else {
//         throw new Error(data.msg || 'Google authentication failed');
//       }
//     } catch (error) {
//       console.error('❌ Google Sign-In error:', error);
//       Notify.failure('Google Sign-In failed. Please try again.');
//       setError('Google Sign-In failed. Please try again.');
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   // Handle Google Sign-In button click
//   const handleGoogleSignIn = () => {
//     if (window.google) {
//       setGoogleLoading(true);
//       window.google.accounts.id.prompt();
//     } else {
//       Notify.failure('Google Sign-In not available. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   }; 

//   const redirectBasedOnRole = async (userData, token) => {
//     const userRole = userData.role || userData.userRole;
    
//     console.log('🔍 User role detected:', userRole);
//     console.log('👤 User data:', userData);

//     // Check user role and redirect accordingly
//     switch (userRole) {
//       case 'admin':
//       case 'advisor':
//         console.log('👨‍🏫 Redirecting advisor/admin to dashboard...');
//         Notify.success(`Welcome back, ${userData.name}! Redirecting to advisor dashboard...`);
        
//         setTimeout(() => {
//           window.location.href = '/advisorDashboard';
//         }, 1500);
//         break;

//       case 'student':
//         console.log('👨‍🎓 Student detected, checking profile...');
//         await checkStudentProfileAndRedirect(token, userData);
//         break;

//       default:
//         console.log('❓ Unknown role, treating as student...');
//         await checkStudentProfileAndRedirect(token, userData);
//         break;
//     }
//   };

//   // Function to check student profile and redirect accordingly
//   const checkStudentProfileAndRedirect = async (token, userData) => {
//     try {
//       console.log('🔍 Checking if student has a profile...');
      
//       const response = await fetch('http://localhost:5000/api/student/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const profileData = await response.json();
//         console.log('✅ Student has profile, redirecting to student dashboard');
        
//         localStorage.setItem('profileCompleted', 'true');
//         if (profileData.profile?._id) {
//           localStorage.setItem('profileId', profileData.profile._id);
//         }
        
//         Notify.success(`Welcome back, ${userData.name}! Redirecting to your dashboard...`);
        
//         setTimeout(() => {
//           window.location.href = '/dashboard/ProfileDashboard';
//         }, 1500);
        
//       } else if (response.status === 404) {
//         console.log('📝 Student needs to create profile');
        
//         localStorage.setItem('profileCompleted', 'false');
        
//         Notify.info(`Welcome ${userData.name}! Please complete your profile to continue...`);
        
//         setTimeout(() => {
//           window.location.href = '/dashboard';
//         }, 1500);
        
//       } else {
//         console.log('⚠️ Error checking profile, redirecting to create profile');
        
//         Notify.warning('Please complete your profile to continue...');
        
//         setTimeout(() => {
//           window.location.href = '/dashboard';
//         }, 1500);
//       }
//     } catch (error) {
//       console.error('❌ Error checking student profile:', error);
      
//       Notify.warning('Redirecting to profile creation...');
      
//       setTimeout(() => {
//         window.location.href = '/das';
//       }, 1500);
//     }
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
//         localStorage.setItem('token', data.token);
        
//         const userData = {
//           id: data._id || data.user?.id,
//           name: data.name || data.user?.name,
//           email: data.email || data.user?.email,
//           role: data.role || data.user?.role || data.userRole,
//           authMethod: 'email'
//         };
        
//         localStorage.setItem('user', JSON.stringify(userData));
//         localStorage.setItem('authMethod', 'email');
        
//         if (data.profileCompleted) {
//           localStorage.setItem('profileCompleted', 'true');
//         }
        
//         if (data.profileId) {
//           localStorage.setItem('profileId', data.profileId);
//         }
        
//         console.log('✅ Login successful:', userData);
//         console.log('🔑 Token stored:', data.token);
        
//         Notify.success('Login successful! Redirecting...');
        
//         await redirectBasedOnRole(userData, data.token);
        
//       } else {
//         Notify.failure(data.msg || 'Login failed');
//         setError(data.msg || 'Login failed');
//       }
//     } catch (err) {
//       const errorMessage = 'Network error. Please try again.';
//       Notify.failure(errorMessage);
//       setError(errorMessage);
//       console.error('Login error:', err);
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
//           <div className="auth-header">
//             <div className="auth-logo">
//             <img src={aucaLogo} alt="AUCA Logo" className="logo-image" />
//               <h1 className="auth-title">Welcome Back</h1>
//             </div>
//             <p className="auth-subtitle">Sign in to continue your career journey</p>
//           </div>
          
//           <div className="auth-form">
//             {error && (
//               <div className="error-message">
//                 <span className="error-icon"></span>
//                 {error}
//               </div>
//             )}

            

//             {/* Divider */}            
//             <div className="form-group">
//               {/* <label htmlFor="email" className="form-label">
//                 Email Address
//               </label> */}
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
//               {/* <label htmlFor="password" className="form-label">
//                 Password
//               </label> */}
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

//             {/* <div className="form-options">
//               <label className="checkbox-wrapper">
//                 <input type="checkbox" className="checkbox" />
//                 <span className="checkmark"></span>
//                 Remember me
//               </label>
//               <button type="button" className="forgot-password">
//                 Forgot password?
//               </button>
//             </div> */}

//             <button
//               type="button"
//               onClick={handleSubmit}
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
//           </div>

//           {/* Google Sign-In Button */}
//           <button
//               type="button"
//               onClick={handleGoogleSignIn}
//               disabled={googleLoading || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"}
//               style={{
//                 width: '100%',
//                 marginBottom: '1rem',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: '8px',
//                 padding: '12px 16px',
//                 backgroundColor: googleLoading ? '#f3f4f6' : '#ffffff',
//                 border: '2px solid #dadce0',
//                 borderRadius: '8px',
//                 fontSize: '16px',
//                 fontWeight: '500',
//                 color: googleLoading ? '#9ca3af' : '#3c4043',
//                 cursor: googleLoading ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.2s ease'
//               }}
//             >
//               {googleLoading ? (
//                 <>
//                   <div className="google-spinner"></div>
//                   Signing in with Google...
//                 </>
//               ) : (
//                 <>
//                   <svg width="20" height="20" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   Continue with Google
//                 </>
//               )}
//             </button>

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

//         {/* <button
//           onClick={handleBackToHome}
//           className="back-home-btn"
//         >
//           <span className="back-icon">←</span>
//           Back to Home
//         </button> */}
//       </div>
//     </div>
//   );
// };


// export const tokenUtils = {
//   getToken: () => localStorage.getItem('token'),
//   getUser: () => {
//     const userData = localStorage.getItem('user');
//     return userData ? JSON.parse(userData) : null;
//   },
//   getAuthMethod: () => localStorage.getItem('authMethod') || 'email',
//   isAuthenticated: () => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
//     return !!(token && user);
//   },
//   getUserRole: () => {
//     const user = tokenUtils.getUser();
//     return user?.role || user?.userRole || 'student';
//   },
//   isAdvisorOrAdmin: () => {
//     const role = tokenUtils.getUserRole();
//     return role === 'advisor' || role === 'admin';
//   },
//   isStudent: () => {
//     const role = tokenUtils.getUserRole();
//     return role === 'student' || !role;
//   },
//   isGoogleUser: () => tokenUtils.getAuthMethod() === 'google',
//   clearStorage: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('profileCompleted');
//     localStorage.removeItem('profileId');
//     localStorage.removeItem('assessmentCompleted');
//     localStorage.removeItem('hasRecommendations');
//     localStorage.removeItem('authMethod');
//   },
//   getAuthHeader: () => {
//     const token = localStorage.getItem('token');
//     return token ? { 'Authorization': `Bearer ${token}` } : {};
//   },
//   checkUserProfile: async () => {
//     try {
//       const token = tokenUtils.getToken();
//       if (!token) return null;

//       if (!tokenUtils.isStudent()) {
//         return { hasProfile: true, isAdvisor: true };
//       }

//       const response = await fetch('http://localhost:5000/api/student/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return { hasProfile: true, profile: data.profile };
//       } else if (response.status === 404) {
//         return { hasProfile: false };
//       } else {
//         throw new Error('Failed to check profile');
//       }
//     } catch (error) {
//       console.error('Error checking user profile:', error);
//       return { hasProfile: false, error: true };
//     }
//   },
//   redirectToDashboard: async () => {
//     const role = tokenUtils.getUserRole();
    
//     switch (role) {
//       case 'admin':
//          window.location.href = '/adminDashboard';
//         break;
//       case 'advisor':
//         window.location.href = '/advisorDashboard';
//         break;
//       case 'student':
//       default:
//         const profileCheck = await tokenUtils.checkUserProfile();
//         if (profileCheck?.hasProfile) {
//           window.location.href = '/dashboard/ProfileDashboard';
//         } else {
//           window.location.href = '/dashboard';
//         }
//         break;
//     }
//   }
// };

// export const routeProtection = {
//   canAccessAdvisorRoutes: () => tokenUtils.isAdvisorOrAdmin(),
//   canAccessStudentRoutes: () => tokenUtils.isStudent(),
//   redirectIfUnauthorized: (requiredRole = 'student') => {
//     if (!tokenUtils.isAuthenticated()) {
//       window.location.href = '/login';
//       return false;
//     }
    
//     const userRole = tokenUtils.getUserRole();
    
//     if (requiredRole === 'advisor' && !tokenUtils.isAdvisorOrAdmin()) {
//       window.location.href = '/ProfileDashboard'; 
//       return false;
//     }
    
//     if (requiredRole === 'student' && !tokenUtils.isStudent()) {
//       window.location.href = '/advisorDashboard'; 
//       return false;
//     }
    
//     return true;
//   }
// };

// export { Login };


// components/Login.jsx - Fixed Admin Dashboard Redirect
import React, { useState, useEffect } from 'react';
import '../components/styles/auth.css';
import { Notify } from 'notiflix';
import aucaLogo from '/AUCALOGO.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

  // Initialize Google Sign-In
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google && GOOGLE_CLIENT_ID !== "800358726952-lqihldijgthlltjqcnsqgq36rb88rqkh.apps.googleusercontent.com") {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse
        });
      }
    };

    // Add CSS for spinner animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .google-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #4285f4;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  // Parse JWT token from Google
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };

  // Handle Google Sign-In response
  const handleGoogleResponse = async (response) => {
    setGoogleLoading(true);
    setError('');

    try {
      const userInfo = parseJwt(response.credential);
      
      if (!userInfo) {
        throw new Error('Failed to parse Google user information');
      }

      console.log('🔍 Google user info:', userInfo);

      // Send Google user data to your backend
      const loginResponse = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          googleToken: response.credential,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          googleId: userInfo.sub,
          given_name: userInfo.given_name,
          family_name: userInfo.family_name
        })
      });

      const data = await loginResponse.json();

      if (loginResponse.ok) {
        // Store authentication token
        localStorage.setItem('token', data.token);
        
        // Store user data with comprehensive role handling
        const userData = {
          id: data._id || data.user?.id || userInfo.sub,
          name: data.name || data.user?.name || userInfo.name,
          email: data.email || data.user?.email || userInfo.email,
          role: data.role || data.user?.role || data.userRole || 'student',
          picture: userInfo.picture,
          authMethod: 'google'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authMethod', 'google');
        
        // Store additional data if available
        if (data.profileCompleted) {
          localStorage.setItem('profileCompleted', 'true');
        }
        
        if (data.profileId) {
          localStorage.setItem('profileId', data.profileId);
        }
        
        console.log('✅ Google login successful:', userData);
        console.log('🔑 Token stored:', data.token);
        
        Notify.success(`Welcome ${userData.name}! Signing you in...`);
        
        // Redirect based on user role
        await redirectBasedOnRole(userData, data.token);
        
      } else {
        throw new Error(data.msg || 'Google authentication failed');
      }
    } catch (error) {
      console.error('❌ Google Sign-In error:', error);
      Notify.failure('Google Sign-In failed. Please try again.');
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle Google Sign-In button click
  const handleGoogleSignIn = () => {
    if (window.google) {
      setGoogleLoading(true);
      window.google.accounts.id.prompt();
    } else {
      Notify.failure('Google Sign-In not available. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }; 

  // FIXED: Separate admin and advisor redirects
  const redirectBasedOnRole = async (userData, token) => {
    const userRole = userData.role || userData.userRole;
    
    console.log('🔍 User role detected:', userRole);
    console.log('👤 User data:', userData);

    // Check user role and redirect accordingly
    switch (userRole) {
      case 'admin':
        console.log('👨‍💼 Redirecting admin to admin dashboard...');
        Notify.success(`Welcome back, Admin ${userData.name}! Redirecting to admin dashboard...`);
        
        setTimeout(() => {
          window.location.href = '/adminDashboard';
        }, 1500);
        break;

      case 'advisor':
        console.log('👨‍🏫 Redirecting advisor to advisor dashboard...');
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

  // Function to check student profile and redirect accordingly
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
        const profileData = await response.json();
        console.log('✅ Student has profile, redirecting to student dashboard');
        
        localStorage.setItem('profileCompleted', 'true');
        if (profileData.profile?._id) {
          localStorage.setItem('profileId', profileData.profile._id);
        }
        
        Notify.success(`Welcome back, ${userData.name}! Redirecting to your dashboard...`);
        
        setTimeout(() => {
          window.location.href = '/dashboard/ProfileDashboard';
        }, 1500);
        
      } else if (response.status === 404) {
        console.log('📝 Student needs to create profile');
        
        localStorage.setItem('profileCompleted', 'false');
        
        Notify.info(`Welcome ${userData.name}! Please complete your profile to continue...`);
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
        
      } else {
        console.log('⚠️ Error checking profile, redirecting to create profile');
        
        Notify.warning('Please complete your profile to continue...');
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Error checking student profile:', error);
      
      Notify.warning('Redirecting to profile creation...');
      
      setTimeout(() => {
        window.location.href = '/dashboard';
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
        localStorage.setItem('token', data.token);
        
        const userData = {
          id: data._id || data.user?.id,
          name: data.name || data.user?.name,
          email: data.email || data.user?.email,
          role: data.role || data.user?.role || data.userRole,
          authMethod: 'email'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authMethod', 'email');
        
        if (data.profileCompleted) {
          localStorage.setItem('profileCompleted', 'true');
        }
        
        if (data.profileId) {
          localStorage.setItem('profileId', data.profileId);
        }
        
        console.log('✅ Login successful:', userData);
        console.log('🔑 Token stored:', data.token);
        
        Notify.success('Login successful! Redirecting...');
        
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
 
  return (
    <div className="auth-container">
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
            <img src={aucaLogo} alt="AUCA Logo" className="logo-image" />
              <h1 className="auth-title">Welcome Back</h1>
            </div>
            <p className="auth-subtitle">Sign in to continue your career journey</p>
          </div>
          
          <div className="auth-form">
            {error && (
              <div className="error-message">
                <span className="error-icon"></span>
                {error}
              </div>
            )}

            <div className="form-group">
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

          {/* Google Sign-In Button */}
          <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"}
              style={{
                width: '100%',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 16px',
                backgroundColor: googleLoading ? '#f3f4f6' : '#ffffff',
                border: '2px solid #dadce0',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                color: googleLoading ? '#9ca3af' : '#3c4043',
                cursor: googleLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {googleLoading ? (
                <>
                  <div className="google-spinner"></div>
                  Signing in with Google...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

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
      </div>
    </div>
  );
};

// FIXED: Updated tokenUtils with proper admin redirect
export const tokenUtils = {
  getToken: () => localStorage.getItem('token'),
  getUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },
  getAuthMethod: () => localStorage.getItem('authMethod') || 'email',
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },
  getUserRole: () => {
    const user = tokenUtils.getUser();
    return user?.role || user?.userRole || 'student';
  },
  isAdmin: () => {
    const role = tokenUtils.getUserRole();
    return role === 'admin';
  },
  isAdvisor: () => {
    const role = tokenUtils.getUserRole();
    return role === 'advisor';
  },
  isAdvisorOrAdmin: () => {
    const role = tokenUtils.getUserRole();
    return role === 'advisor' || role === 'admin';
  },
  isStudent: () => {
    const role = tokenUtils.getUserRole();
    return role === 'student' || !role;
  },
  isGoogleUser: () => tokenUtils.getAuthMethod() === 'google',
  clearStorage: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileCompleted');
    localStorage.removeItem('profileId');
    localStorage.removeItem('assessmentCompleted');
    localStorage.removeItem('hasRecommendations');
    localStorage.removeItem('authMethod');
  },
  getAuthHeader: () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },
  checkUserProfile: async () => {
    try {
      const token = tokenUtils.getToken();
      if (!token) return null;

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
        return { hasProfile: false };
      } else {
        throw new Error('Failed to check profile');
      }
    } catch (error) {
      console.error('Error checking user profile:', error);
      return { hasProfile: false, error: true };
    }
  },
  // FIXED: Proper role-based redirects
  redirectToDashboard: async () => {
    const role = tokenUtils.getUserRole();
    
    console.log('🔄 Redirecting based on role:', role);
    
    switch (role) {
      case 'admin':
        console.log('👨‍💼 Redirecting to admin dashboard');
        window.location.href = '/adminDashboard';
        break;
      case 'advisor':
        console.log('👨‍🏫 Redirecting to advisor dashboard');
        window.location.href = '/advisorDashboard';
        break;
      case 'student':
      default:
        console.log('👨‍🎓 Checking student profile...');
        const profileCheck = await tokenUtils.checkUserProfile();
        if (profileCheck?.hasProfile) {
          console.log('✅ Student has profile, redirecting to ProfileDashboard');
          window.location.href = '/dashboard/ProfileDashboard';
        } else {
          console.log('📝 Student needs profile, redirecting to dashboard');
          window.location.href = '/dashboard';
        }
        break;
    }
  }
};

export const routeProtection = {
  canAccessAdminRoutes: () => tokenUtils.isAdmin(),
  canAccessAdvisorRoutes: () => tokenUtils.isAdvisorOrAdmin(),
  canAccessStudentRoutes: () => tokenUtils.isStudent(),
  redirectIfUnauthorized: (requiredRole = 'student') => {
    if (!tokenUtils.isAuthenticated()) {
      window.location.href = '/login';
      return false;
    }
    
    const userRole = tokenUtils.getUserRole();
    
    if (requiredRole === 'admin' && !tokenUtils.isAdmin()) {
      console.log('❌ Access denied: Admin required');
      window.location.href = userRole === 'advisor' ? '/advisorDashboard' : '/dashboard/ProfileDashboard';
      return false;
    }
    
    if (requiredRole === 'advisor' && !tokenUtils.isAdvisorOrAdmin()) {
      console.log('❌ Access denied: Advisor/Admin required');
      window.location.href = '/dashboard/ProfileDashboard'; 
      return false;
    }
    
    if (requiredRole === 'student' && !tokenUtils.isStudent()) {
      console.log('❌ Access denied: Student required');
      window.location.href = userRole === 'admin' ? '/adminDashboard' : '/advisorDashboard'; 
      return false;
    }
    
    return true;
  }
};

export { Login };