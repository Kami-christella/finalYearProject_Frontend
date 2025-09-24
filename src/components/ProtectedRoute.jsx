// Create this as a new file: components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix';

const ProtectedRoute = ({ children, requiredRole = null, fallbackPath = '/login' }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // Check if user is logged in
        if (!token) {
          Notify.failure('Please login to access this page');
          navigate(fallbackPath);
          return;
        }

        // Check role if specified
        if (requiredRole) {
          const userRole = user.userRole || user.role;
          if (userRole !== requiredRole) {
            Notify.failure(`Access denied. ${requiredRole} privileges required.`);
            navigate('/'); // Redirect to home
            return;
          }

          // Verify with backend for admin routes
          if (requiredRole === 'admin') {
            const response = await fetch('http://localhost:5000/api/admin/verify', {
              headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
              throw new Error('Admin verification failed');
            }
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        Notify.failure('Authentication failed');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate(fallbackPath);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requiredRole, fallbackPath]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite'
        }}></div>
        <p style={{ marginTop: '1rem' }}>Verifying access...</p>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoute;