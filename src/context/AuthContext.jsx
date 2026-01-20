import React, { createContext, useState, useEffect } from 'react'
import { authAPI, clearAuth, isAuthenticated } from '../services/api'

// Create the Auth Context
export const AuthContext = createContext(null)

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const response = await authAPI.getCurrentUser()
          if (response.success) {
            setUser(response.data)
          } else {
            clearAuth()
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          clearAuth()
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  /**
   * Login function - Uses real backend API
   */
  const login = async (email, password) => {
    setLoading(true)
    
    try {
      const response = await authAPI.login(email, password)
      
      if (response.success) {
        setUser(response.data.user)
        return { success: true, user: response.data.user }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Logout function - Uses real backend API
   */
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      clearAuth()
    }
  }

  /**
   * Register function - Uses real backend API
   */
  const register = async (userData) => {
    setLoading(true)
    
    try {
      const response = await authAPI.register(userData)
      
      if (response.success) {
        setUser(response.data.user)
        return { success: true, user: response.data.user, message: response.message }
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (error) {
      throw new Error(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Update profile function
   */
  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData)
      
      if (response.success) {
        setUser(response.data)
        return { success: true, message: response.message }
      } else {
        throw new Error(response.message || 'Update failed')
      }
    } catch (error) {
      throw new Error(error.message || 'Update failed')
    }
  }

  /**
   * Change password function
   */
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authAPI.changePassword(currentPassword, newPassword)
      
      if (response.success) {
        return { success: true, message: response.message }
      } else {
        throw new Error(response.message || 'Password change failed')
      }
    } catch (error) {
      throw new Error(error.message || 'Password change failed')
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isSupervisor: user?.role === 'supervisor',
    isAdmin: user?.role === 'admin'
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Default export for Fast Refresh compatibility
export default AuthProvider;