// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     const token = localStorage.getItem('token');
//     const expiry = localStorage.getItem('expiry');
//     return token && expiry && Date.now() < Number(expiry);
//   });

//   const [isAdmin, setAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  

//   const login = (token, epin) => {
   

//     localStorage.setItem('token', token);
//     localStorage.setItem('epin', epin); 

//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.role === 'admin') {
//         setIsAuthenticated(true);
//         setAdmin(true);
//         localStorage.setItem('isAdmin', 'true');
        
//         navigate('/admin/dashboard');
//       } else {
//         setIsAuthenticated(true);
//         localStorage.setItem('isAdmin', 'false');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       console.error('Failed to decode token:', error);
//       logout();
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setAdmin(false);
//     localStorage.removeItem('token');
//     localStorage.removeItem('epin');
//     localStorage.removeItem('isAdmin');
//     navigate('/');
//   };


//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


// When the page is reloaded, the state (isAuthenticated and isAdmin) is reset to its initial values, which are derived from localStorage.

// Key Issues:
// Token Expiry Check:

// The initial state of isAuthenticated is determined by checking if the token exists and if it has not expired. However, the expiry time is stored separately in localStorage, which might not be reliable if not properly synchronized with the token's actual expiry.

// Token Decoding:

// The token is not decoded during the initial state setup to validate its expiry or role. This can lead to incorrect assumptions about the user's authentication status.

// State Initialization:

// The isAuthenticated and isAdmin states are initialized only once when the component mounts. If the token is invalid or expired, the state is not updated accordingly.

// Solution:
// To fix this issue, you need to:

// Decode the token during initial state setup to validate its expiry and role.

// Synchronize the token's expiry with the actual expiry time stored in the token itself.

// Update the state dynamically if the token is found to be invalid or expired.

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Decode token and validate expiry
  const validateToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp > currentTime; // Check if token is not expired
    } catch (error) {
      console.error('Failed to decode token:', error);
      return false;
    }
  };

  // Initialize state based on token and its validity
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    
    return token ? validateToken(token) : false;
  });

  const [isAdmin, setAdmin] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded.role === 'admin';
      } catch (error) {
        console.error('Failed to decode token:', error);
        return false;
      }
    }
    return false;
  });

  // Effect to handle token expiry
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const expiryTime = (decoded.exp - Date.now() / 1000) * 1000; // Convert to milliseconds

      // Set a timeout to log out the user when the token expires
      const timeout = setTimeout(() => {
        logout();
      }, expiryTime);

      // Clear timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, []);

  const login = (token, epin) => {
    localStorage.setItem('token', token);
    localStorage.setItem('epin', epin);

    try {
      const decoded = jwtDecode(token);
      if (decoded.role === 'admin') {
        setIsAuthenticated(true);
        setAdmin(true);
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setIsAuthenticated(true);
        localStorage.setItem('isAdmin', 'false');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      logout();
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('epin');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};