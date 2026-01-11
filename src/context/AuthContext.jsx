import React, { createContext, useState, useContext, useEffect } from "react";

// Create the Auth Context
const AuthContext = createContext(null);

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount (mock)
  useEffect(() => {
    const checkAuth = () => {
      // TODO: Replace with actual API call when backend is ready
      // const token = localStorage.getItem('token')
      // if (token) {
      //   fetchUserProfile(token)
      // }

      // Mock: Check localStorage for mock user
      const mockUser = localStorage.getItem("mockUser");
      if (mockUser) {
        setUser(JSON.parse(mockUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Mock login function
  const login = async (email, password) => {
    setLoading(true);

    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password })
    // })

    // Mock login - simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data based on email
        let mockUserData = null;

        if (email === "student@example.com" && password === "password") {
          mockUserData = {
            id: 1,
            name: "John Doe",
            email: "student@example.com",
            role: "student",
            matricNumber: "CSC/2020/001",
          };
        } else if (
          email === "supervisor@example.com" &&
          password === "password"
        ) {
          mockUserData = {
            id: 2,
            name: "Dr. Jane Smith",
            email: "supervisor@example.com",
            role: "supervisor",
            department: "Computer Science",
          };
        } else if (email === "admin@example.com" && password === "password") {
          mockUserData = {
            id: 3,
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
            department: "Administration",
          };
        }

        if (mockUserData) {
          setUser(mockUserData);
          localStorage.setItem("mockUser", JSON.stringify(mockUserData));
          setLoading(false);
          resolve({ success: true, user: mockUserData });
        } else {
          setLoading(false);
          reject({ success: false, message: "Invalid credentials" });
        }
      }, 1000); // Simulate network delay
    });
  };

  // Mock logout function
  const logout = () => {
    // TODO: Replace with actual API call
    // await fetch('/api/auth/logout', { method: 'POST' })

    setUser(null);
    localStorage.removeItem("mockUser");
  };

  // Mock register function
  const register = async (userData) => {
    setLoading(true);

    // TODO: Replace with actual API call
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(userData)
    // })

    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve({ success: true, message: "Registration successful" });
      }, 1000);
    });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isStudent: user?.role === "student",
    isSupervisor: user?.role === "supervisor",
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
