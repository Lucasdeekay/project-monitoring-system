/**
 * API Service - Placeholder for backend integration
 *
 * ALL FUNCTIONS ARE COMMENTED OUT AND REPLACED WITH MOCK DATA
 * When backend is ready, uncomment and configure base URL
 */

// TODO: Configure base URL when backend is deployed
// const API_BASE_URL = 'http://localhost:5000/api'

// Helper function to get auth token
// const getAuthToken = () => {
//   return localStorage.getItem('token')
// }

// Helper function to make authenticated requests
// const authFetch = async (endpoint, options = {}) => {
//   const token = getAuthToken()
//   const headers = {
//     'Content-Type': 'application/json',
//     ...(token && { Authorization: `Bearer ${token}` }),
//     ...options.headers
//   }
//
//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     headers
//   })
//
//   if (!response.ok) {
//     throw new Error(`API Error: ${response.statusText}`)
//   }
//
//   return response.json()
// }

// ==================== AUTHENTICATION APIs ====================

// export const authAPI = {
//   login: async (email, password) => {
//     return authFetch('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password })
//     })
//   },
//
//   register: async (userData) => {
//     return authFetch('/auth/register', {
//       method: 'POST',
//       body: JSON.stringify(userData)
//     })
//   },
//
//   logout: async () => {
//     return authFetch('/auth/logout', {
//       method: 'POST'
//     })
//   },
//
//   getCurrentUser: async () => {
//     return authFetch('/auth/me')
//   }
// }

// ==================== PROJECT APIs ====================

// export const projectAPI = {
//   // Get all projects (with optional filters)
//   getAll: async (filters = {}) => {
//     const params = new URLSearchParams(filters)
//     return authFetch(`/projects?${params}`)
//   },
//
//   // Get single project by ID
//   getById: async (projectId) => {
//     return authFetch(`/projects/${projectId}`)
//   },
//
//   // Create new project (student)
//   create: async (projectData) => {
//     return authFetch('/projects', {
//       method: 'POST',
//       body: JSON.stringify(projectData)
//     })
//   },
//
//   // Update project
//   update: async (projectId, projectData) => {
//     return authFetch(`/projects/${projectId}`, {
//       method: 'PUT',
//       body: JSON.stringify(projectData)
//     })
//   },
//
//   // Delete project
//   delete: async (projectId) => {
//     return authFetch(`/projects/${projectId}`, {
//       method: 'DELETE'
//     })
//   },
//
//   // Submit project for evaluation
//   submit: async (projectId) => {
//     return authFetch(`/projects/${projectId}/submit`, {
//       method: 'POST'
//     })
//   }
// }

// ==================== FEEDBACK APIs ====================

// export const feedbackAPI = {
//   // Get feedback for a project
//   getByProject: async (projectId) => {
//     return authFetch(`/projects/${projectId}/feedback`)
//   },
//
//   // Create feedback (supervisor)
//   create: async (projectId, feedbackData) => {
//     return authFetch(`/projects/${projectId}/feedback`, {
//       method: 'POST',
//       body: JSON.stringify(feedbackData)
//     })
//   },
//
//   // Update feedback
//   update: async (feedbackId, feedbackData) => {
//     return authFetch(`/feedback/${feedbackId}`, {
//       method: 'PUT',
//       body: JSON.stringify(feedbackData)
//     })
//   }
// }

// ==================== EVALUATION APIs ====================

// export const evaluationAPI = {
//   // Get evaluations for a project
//   getByProject: async (projectId) => {
//     return authFetch(`/projects/${projectId}/evaluations`)
//   },
//
//   // Create evaluation (supervisor/admin)
//   create: async (projectId, evaluationData) => {
//     return authFetch(`/projects/${projectId}/evaluations`, {
//       method: 'POST',
//       body: JSON.stringify(evaluationData)
//     })
//   },
//
//   // Update evaluation
//   update: async (evaluationId, evaluationData) => {
//     return authFetch(`/evaluations/${evaluationId}`, {
//       method: 'PUT',
//       body: JSON.stringify(evaluationData)
//     })
//   },
//
//   // Submit final grade
//   submitGrade: async (projectId, gradeData) => {
//     return authFetch(`/projects/${projectId}/grade`, {
//       method: 'POST',
//       body: JSON.stringify(gradeData)
//     })
//   }
// }

// ==================== USER APIs ====================

// export const userAPI = {
//   // Get all users (admin only)
//   getAll: async (role = null) => {
//     const params = role ? `?role=${role}` : ''
//     return authFetch(`/users${params}`)
//   },
//
//   // Get user by ID
//   getById: async (userId) => {
//     return authFetch(`/users/${userId}`)
//   },
//
//   // Update user profile
//   update: async (userId, userData) => {
//     return authFetch(`/users/${userId}`, {
//       method: 'PUT',
//       body: JSON.stringify(userData)
//     })
//   },
//
//   // Get supervisors list
//   getSupervisors: async () => {
//     return authFetch('/users?role=supervisor')
//   }
// }

// ==================== REPORT APIs ====================

// export const reportAPI = {
//   // Generate project report
//   generateProjectReport: async (projectId) => {
//     return authFetch(`/reports/project/${projectId}`)
//   },
//
//   // Generate student report
//   generateStudentReport: async (studentId) => {
//     return authFetch(`/reports/student/${studentId}`)
//   },
//
//   // Generate department statistics
//   getDepartmentStats: async (department) => {
//     return authFetch(`/reports/department/${department}`)
//   },
//
//   // Export data (CSV/PDF)
//   exportData: async (type, filters) => {
//     const params = new URLSearchParams(filters)
//     return authFetch(`/reports/export/${type}?${params}`)
//   }
// }

// ==================== FILE UPLOAD APIs ====================

// export const fileAPI = {
//   // Upload project document
//   uploadDocument: async (projectId, file) => {
//     const formData = new FormData()
//     formData.append('file', file)
//
//     const token = getAuthToken()
//     const response = await fetch(`${API_BASE_URL}/projects/${projectId}/upload`, {
//       method: 'POST',
//       headers: {
//         ...(token && { Authorization: `Bearer ${token}` })
//       },
//       body: formData
//     })
//
//     return response.json()
//   },
//
//   // Delete file
//   deleteFile: async (fileId) => {
//     return authFetch(`/files/${fileId}`, {
//       method: 'DELETE'
//     })
//   }
// }

/**
 * MOCK DATA EXPORTS
 * These will be used until backend is ready
 */

export const MOCK_ENABLED = true;

console.log("📌 API Service loaded - All endpoints are MOCKED");
console.log("⚠️  Replace with real API calls when backend is ready");
