/**
 * API Service - Complete Integration with Backend using Axios
 * Base URL: http://localhost:5000/api
 */

import axios from "axios";

// Backend base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || "An error occurred";

      // Handle 401 Unauthorized - Token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(
        new Error("Network error. Please check your connection."),
      );
    } else {
      // Something else happened
      return Promise.reject(new Error(error.message || "An error occurred"));
    }
  },
);

// ==================== AUTHENTICATION APIs ====================

export const authAPI = {
  /**
   * Login user
   * POST /api/auth/login
   */
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });

    // Store token in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Register new user
   * POST /api/auth/register
   */
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);

    // Store token in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response;
  },

  /**
   * Logout user
   * POST /api/auth/logout
   */
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  getCurrentUser: async () => {
    return api.get("/auth/me");
  },

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  updateProfile: async (profileData) => {
    return api.put("/auth/profile", profileData);
  },

  /**
   * Change password
   * PUT /api/auth/change-password
   */
  changePassword: async (currentPassword, newPassword) => {
    return api.put("/auth/change-password", { currentPassword, newPassword });
  },
};

// ==================== PROJECT APIs ====================

export const projectAPI = {
  /**
   * Get all projects (with optional filters)
   * GET /api/projects
   */
  getAll: async (filters = {}) => {
    return api.get("/projects", { params: filters });
  },

  /**
   * Get single project by ID
   * GET /api/projects/:id
   */
  getById: async (projectId) => {
    return api.get(`/projects/${projectId}`);
  },

  /**
   * Create new project (student)
   * POST /api/projects
   */
  create: async (projectData) => {
    return api.post("/projects", projectData);
  },

  /**
   * Update project
   * PUT /api/projects/:id
   */
  update: async (projectId, projectData) => {
    return api.put(`/projects/${projectId}`, projectData);
  },

  /**
   * Delete project
   * DELETE /api/projects/:id
   */
  delete: async (projectId) => {
    return api.delete(`/projects/${projectId}`);
  },

  /**
   * Submit project for evaluation
   * POST /api/projects/:id/submit
   */
  submit: async (projectId) => {
    return api.post(`/projects/${projectId}/submit`);
  },

  /**
   * Get project statistics
   * GET /api/projects/:id/statistics
   */
  getStatistics: async (projectId) => {
    return api.get(`/projects/${projectId}/statistics`);
  },
};

// ==================== FEEDBACK APIs ====================

export const feedbackAPI = {
  /**
   * Get feedback for a project
   * GET /api/feedback/project/:projectId
   */
  getByProject: async (projectId) => {
    return api.get(`/feedback/project/${projectId}`);
  },

  /**
   * Get single feedback by ID
   * GET /api/feedback/:id
   */
  getById: async (feedbackId) => {
    return api.get(`/feedback/${feedbackId}`);
  },

  /**
   * Create feedback (supervisor)
   * POST /api/feedback
   */
  create: async (feedbackData) => {
    return api.post("/feedback", feedbackData);
  },

  /**
   * Update feedback
   * PUT /api/feedback/:id
   */
  update: async (feedbackId, feedbackData) => {
    return api.put(`/feedback/${feedbackId}`, feedbackData);
  },

  /**
   * Delete feedback
   * DELETE /api/feedback/:id
   */
  delete: async (feedbackId) => {
    return api.delete(`/feedback/${feedbackId}`);
  },

  /**
   * Mark feedback as read
   * PUT /api/feedback/:id/read
   */
  markAsRead: async (feedbackId) => {
    return api.put(`/feedback/${feedbackId}/read`);
  },

  /**
   * Get unread feedback count (students)
   * GET /api/feedback/unread/count
   */
  getUnreadCount: async () => {
    return api.get("/feedback/unread/count");
  },

  /**
   * Get all feedback for current student
   * GET /api/feedback/student/all
   */
  getAllForStudent: async () => {
    return api.get("/feedback/student/all");
  },

  /**
   * Get feedback given by current supervisor
   * GET /api/feedback/supervisor/given
   */
  getGivenBySupervisor: async () => {
    return api.get("/feedback/supervisor/given");
  },
};

// ==================== EVALUATION APIs ====================

export const evaluationAPI = {
  /**
   * Get evaluations for a project
   * GET /api/evaluations/project/:projectId
   */
  getByProject: async (projectId) => {
    return api.get(`/evaluations/project/${projectId}`);
  },

  /**
   * Get single evaluation by ID
   * GET /api/evaluations/:id
   */
  getById: async (evaluationId) => {
    return api.get(`/evaluations/${evaluationId}`);
  },

  /**
   * Create evaluation (supervisor/admin)
   * POST /api/evaluations
   */
  create: async (evaluationData) => {
    return api.post("/evaluations", evaluationData);
  },

  /**
   * Update evaluation
   * PUT /api/evaluations/:id
   */
  update: async (evaluationId, evaluationData) => {
    return api.put(`/evaluations/${evaluationId}`, evaluationData);
  },

  /**
   * Delete evaluation (admin only)
   * DELETE /api/evaluations/:id
   */
  delete: async (evaluationId) => {
    return api.delete(`/evaluations/${evaluationId}`);
  },

  /**
   * Get evaluation statistics summary (admin)
   * GET /api/evaluations/statistics/summary
   */
  getStatistics: async () => {
    return api.get("/evaluations/statistics/summary");
  },

  /**
   * Get evaluations completed by current supervisor
   * GET /api/evaluations/supervisor/completed
   */
  getCompletedBySupervisor: async () => {
    return api.get("/evaluations/supervisor/completed");
  },

  /**
   * Get evaluations for current student
   * GET /api/evaluations/student/my-evaluations
   */
  getMyEvaluations: async () => {
    return api.get("/evaluations/student/my-evaluations");
  },
};

// ==================== USER APIs ====================

export const userAPI = {
  /**
   * Get all users (admin only)
   * GET /api/users
   */
  getAll: async (filters = {}) => {
    return api.get("/users", { params: filters });
  },

  /**
   * Get user by ID (admin only)
   * GET /api/users/:id
   */
  getById: async (userId) => {
    return api.get(`/users/${userId}`);
  },

  /**
   * Create new user (admin only)
   * POST /api/users
   */
  create: async (userData) => {
    return api.post("/users", userData);
  },

  /**
   * Update user (admin only)
   * PUT /api/users/:id
   */
  update: async (userId, userData) => {
    return api.put(`/users/${userId}`, userData);
  },

  /**
   * Delete user (admin only)
   * DELETE /api/users/:id
   */
  delete: async (userId) => {
    return api.delete(`/users/${userId}`);
  },

  /**
   * Get supervisors list
   * GET /api/users/supervisors/list
   */
  getSupervisors: async () => {
    return api.get("/users/supervisors/list");
  },

  /**
   * Get user statistics (admin only)
   * GET /api/users/statistics/overview
   */
  getStatistics: async () => {
    return api.get("/users/statistics/overview");
  },

  /**
   * Reset user password (admin only)
   * POST /api/users/:id/reset-password
   */
  resetPassword: async (userId, newPassword) => {
    return api.post(`/users/${userId}/reset-password`, { newPassword });
  },

  /**
   * Get count of users by role (admin only)
   * GET /api/users/role/:role/count
   */
  getCountByRole: async (role) => {
    return api.get(`/users/role/${role}/count`);
  },
};

// ==================== REPORT APIs ====================

export const reportAPI = {
  /**
   * Get dashboard statistics (admin only)
   * GET /api/reports/dashboard
   */
  getDashboard: async () => {
    return api.get("/reports/dashboard");
  },

  /**
   * Get department report (admin only)
   * GET /api/reports/department/:department
   */
  getDepartmentReport: async (department) => {
    return api.get(`/reports/department/${encodeURIComponent(department)}`);
  },

  /**
   * Get student report
   * GET /api/reports/student/:studentId
   */
  getStudentReport: async (studentId) => {
    return api.get(`/reports/student/${studentId}`);
  },

  /**
   * Get supervisor report
   * GET /api/reports/supervisor/:supervisorId
   */
  getSupervisorReport: async (supervisorId) => {
    return api.get(`/reports/supervisor/${supervisorId}`);
  },

  /**
   * Get timeline report (admin only)
   * GET /api/reports/timeline
   */
  getTimeline: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    return api.get("/reports/timeline", { params });
  },
};

// ==================== DOCUMENT APIs ====================

export const documentAPI = {
  /**
   * Upload project document
   * POST /api/documents (to be implemented)
   */
  upload: async (projectId, file, documentType = "report") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("projectId", projectId);
    formData.append("type", documentType);

    return api.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   * Get documents for a project
   * GET /api/documents/project/:projectId (to be implemented)
   */
  getByProject: async (projectId) => {
    return api.get(`/documents/project/${projectId}`);
  },

  /**
   * Delete document
   * DELETE /api/documents/:id (to be implemented)
   */
  delete: async (documentId) => {
    return api.delete(`/documents/${documentId}`);
  },

  /**
   * Download document
   * GET /api/documents/:id/download (to be implemented)
   */
  download: async (documentId) => {
    return api.get(`/documents/${documentId}/download`, {
      responseType: "blob",
    });
  },
};

// ==================== NOTIFICATION APIs ====================

export const notificationAPI = {
  /**
   * Get notifications for current user
   * GET /api/notifications (to be implemented)
   */
  getAll: async () => {
    return api.get("/notifications");
  },

  /**
   * Mark notification as read
   * PUT /api/notifications/:id/read (to be implemented)
   */
  markAsRead: async (notificationId) => {
    return api.put(`/notifications/${notificationId}/read`);
  },

  /**
   * Mark all notifications as read
   * PUT /api/notifications/read-all (to be implemented)
   */
  markAllAsRead: async () => {
    return api.put("/notifications/read-all");
  },

  /**
   * Get unread notification count
   * GET /api/notifications/unread/count (to be implemented)
   */
  getUnreadCount: async () => {
    return api.get("/notifications/unread/count");
  },

  /**
   * Delete notification
   * DELETE /api/notifications/:id (to be implemented)
   */
  delete: async (notificationId) => {
    return api.delete(`/notifications/${notificationId}`);
  },
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Get stored token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Get stored user
 */
export const getStoredUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Clear authentication
 */
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Handle API errors globally
 */
export const handleApiError = (error) => {
  console.error("API Error:", error);

  if (
    error.message?.includes("Token expired") ||
    error.message?.includes("Unauthorized")
  ) {
    clearAuth();
    window.location.href = "/login";
  }

  return {
    success: false,
    message: error.message || "An error occurred",
  };
};

// Export default api instance for custom requests
export default api;

// Log that API service is loaded
console.log("✅ API Service loaded - Connected to:", API_BASE_URL);
