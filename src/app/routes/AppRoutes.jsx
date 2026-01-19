import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// Layout components (will be created later)
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Auth pages (will be created later)
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

// Student pages (will be created later)
import StudentDashboard from "../../pages/student/Dashboard";
import StudentProjects from "../../pages/student/Projects";
import StudentProjectDetails from "../../pages/student/ProjectDetails";

// Supervisor pages (will be created later)
import SupervisorDashboard from "../../pages/supervisor/Dashboard";
import SupervisorProjects from "../../pages/supervisor/Projects";
import SupervisorProjectDetails from "../../pages/supervisor/ProjectDetails";

// Admin pages (will be created later)
import AdminDashboard from "../../pages/admin/Dashboard";
import AdminProjects from "../../pages/admin/Projects";
import AdminUsers from "../../pages/admin/Users";
import AdminReports from "../../pages/admin/Reports";

// Shared pages (will be created later)
import Profile from "../../pages/shared/Profile";
import NotFound from "../../pages/shared/NotFound";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    // Redirect to appropriate dashboard based on role
    const dashboardRoutes = {
      student: "/student/dashboard",
      supervisor: "/supervisor/dashboard",
      admin: "/admin/dashboard",
    };
    return <Navigate to={dashboardRoutes[user.role] || "/login"} replace />;
  }

  return children;
};

// Main Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes (Auth) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* Student routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/projects"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout>
              <StudentProjects />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/projects/:id"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout>
              <StudentProjectDetails />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Supervisor routes */}
      <Route
        path="/supervisor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <DashboardLayout>
              <SupervisorDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/projects"
        element={
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <DashboardLayout>
              <SupervisorProjects />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/supervisor/projects/:id"
        element={
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <DashboardLayout>
              <SupervisorProjectDetails />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <AdminProjects />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <AdminUsers />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <AdminReports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Shared routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["student", "supervisor", "admin"]}>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Unauthorized page */}
      <Route
        path="/unauthorized"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-violet-600">403</h1>
              <p className="text-xl text-gray-700 mt-4">Unauthorized Access</p>
              <p className="text-gray-600 mt-2">
                You don't have permission to view this page.
              </p>
            </div>
          </div>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
