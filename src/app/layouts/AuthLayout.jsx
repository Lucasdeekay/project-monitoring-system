import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-600 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Project Monitoring System
          </h1>
          <p className="text-gray-600 mt-2">
            Final Year Project Management & Evaluation
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">{children}</div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            © 2025 University Project Monitoring System
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-sm">
            <Link to="/help" className="text-violet-600 hover:text-violet-700">
              Help
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/privacy"
              className="text-violet-600 hover:text-violet-700"
            >
              Privacy
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/terms" className="text-violet-600 hover:text-violet-700">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
