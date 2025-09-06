import { createContext, useState, useEffect } from 'react';

// Create the authentication context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken('');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Load user data from token on initial mount
  useEffect(() => {

    const loadUser = async () => {
      if (authToken) {
        try {
          // You can add an API call here to fetch user data using the token
          // For example:
          const response = await axios.get('http://localhost:5000/api/auth/user', {
            headers: { 'x-auth-token': authToken }
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error loading user:', error);
          logout(); // Clear invalid token
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [authToken]);

  // Provide the context value to consuming components
  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};