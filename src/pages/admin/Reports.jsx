import React, { useState, useEffect } from "react";
import api from "../../services/api";

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState({
    dashboard: null,
    projects: [],
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard statistics
      const dashboardRes = await api.get("/reports/dashboard");

      // Fetch all projects for detailed analysis
      const projectsRes = await api.get("/projects", {
        params: { limit: 100 },
      });

      setReportData({
        dashboard: dashboardRes.data,
        projects: projectsRes.data || [],
      });
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError(err.message || "Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (!reportData.projects.length) {
      return {
        totalProjects: 0,
        completedProjects: 0,
        inProgressProjects: 0,
        submittedProjects: 0,
        avgProgress: 0,
        completionRate: 0,
      };
    }

    const totalProjects = reportData.projects.length;
    const completedProjects = reportData.projects.filter(
      (p) => p.status === "approved",
    ).length;
    const inProgressProjects = reportData.projects.filter(
      (p) => p.status === "in_progress",
    ).length;
    const submittedProjects = reportData.projects.filter(
      (p) => p.status === "submitted" || p.status === "under_review",
    ).length;

    const avgProgress =
      reportData.projects.reduce((sum, p) => sum + (p.progress || 0), 0) /
      totalProjects;

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      submittedProjects,
      avgProgress: Math.round(avgProgress),
      completionRate:
        totalProjects > 0
          ? Math.round((completedProjects / totalProjects) * 100)
          : 0,
    };
  };

  const handleExportPDF = () => {
    alert("PDF export functionality will be implemented with a PDF library");
  };

  const handleGenerateReport = async () => {
    try {
      // You can call a specific endpoint for report generation
      alert("Report generated successfully!");
    } catch (err) {
      console.error("Error generating report:", err);
      alert("Failed to generate report");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex">
          <svg
            className="h-5 w-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error loading reports
            </h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={fetchReportData}
              className="mt-2 text-sm text-red-600 hover:text-red-500 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = reportData.dashboard || {};
  const calculatedStats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            System-wide statistics and performance metrics
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export PDF
          </button>
          <button
            onClick={handleGenerateReport}
            className="inline-flex items-center px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-2 flex-wrap">
          {["overview", "projects", "departments", "performance"].map(
            (report) => (
              <button
                key={report}
                onClick={() => setSelectedReport(report)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  selectedReport === report
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {report} Report
              </button>
            ),
          )}
        </div>
      </div>

      {/* Overview Report */}
      {selectedReport === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Projects
                </h3>
                <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-violet-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalProjects || 0}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                All registered projects
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Completed</h3>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {calculatedStats.completedProjects}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {calculatedStats.completionRate}% completion rate
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  In Progress
                </h3>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {calculatedStats.inProgressProjects}
              </p>
              <p className="text-sm text-gray-500 mt-2">Active projects</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Avg Progress
                </h3>
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {stats.averageProgress || calculatedStats.avgProgress}%
              </p>
              <p className="text-sm text-gray-500 mt-2">Overall progress</p>
            </div>
          </div>

          {/* Users Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              User Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <p className="text-4xl font-bold text-blue-600">
                  {stats.totalStudents || 0}
                </p>
                <p className="text-sm text-gray-600 mt-2">Total Students</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-600">
                  {stats.totalSupervisors || 0}
                </p>
                <p className="text-sm text-gray-600 mt-2">Total Supervisors</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <p className="text-4xl font-bold text-purple-600">
                  {stats.totalSupervisors > 0
                    ? (stats.totalStudents / stats.totalSupervisors).toFixed(1)
                    : "0"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Student-Supervisor Ratio
                </p>
              </div>
            </div>
          </div>

          {/* Project Status Distribution */}
          {stats.projectsByStatus &&
            Object.keys(stats.projectsByStatus).length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Project Status Distribution
                </h2>
                <div className="space-y-4">
                  {Object.entries(stats.projectsByStatus).map(
                    ([status, count]) => {
                      const percentage =
                        stats.totalProjects > 0
                          ? (count / stats.totalProjects) * 100
                          : 0;
                      const colors = {
                        draft: "bg-gray-500",
                        in_progress: "bg-blue-500",
                        submitted: "bg-green-500",
                        under_review: "bg-yellow-500",
                        approved: "bg-emerald-500",
                        rejected: "bg-red-500",
                      };
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {status.replace("_", " ")}
                            </span>
                            <span className="text-sm text-gray-600">
                              {count} projects ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`${colors[status] || "bg-gray-500"} h-3 rounded-full transition-all`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
        </div>
      )}

      {/* Projects Report */}
      {selectedReport === "projects" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Project Performance Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Projects by Progress
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      range: "0-25%",
                      count: reportData.projects.filter(
                        (p) => p.progress >= 0 && p.progress < 25,
                      ).length,
                      color: "bg-red-500",
                    },
                    {
                      range: "25-50%",
                      count: reportData.projects.filter(
                        (p) => p.progress >= 25 && p.progress < 50,
                      ).length,
                      color: "bg-yellow-500",
                    },
                    {
                      range: "50-75%",
                      count: reportData.projects.filter(
                        (p) => p.progress >= 50 && p.progress < 75,
                      ).length,
                      color: "bg-blue-500",
                    },
                    {
                      range: "75-100%",
                      count: reportData.projects.filter((p) => p.progress >= 75)
                        .length,
                      color: "bg-green-500",
                    },
                  ].map((item) => (
                    <div
                      key={item.range}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${item.color} mr-2`}
                        ></div>
                        <span className="text-sm text-gray-700">
                          {item.range}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.count} projects
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Submission Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Submitted</span>
                    <span className="text-sm font-medium text-gray-900">
                      {calculatedStats.submittedProjects} projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">In Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {calculatedStats.inProgressProjects} projects
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Completed</span>
                    <span className="text-sm font-medium text-gray-900">
                      {calculatedStats.completedProjects} projects
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects Table */}
          {reportData.projects.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Project Updates
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.projects.slice(0, 5).map((project) => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {project.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {project.studentName}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="capitalize">
                            {project.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {project.progress}%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {project.updatedAt
                            ? new Date(project.updatedAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Departments Report */}
      {selectedReport === "departments" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Department Analytics
            </h2>
            <div className="space-y-6">
              {stats.projectsByDepartment &&
              stats.projectsByDepartment.length > 0 ? (
                stats.projectsByDepartment.map((dept) => {
                  const percentage =
                    stats.totalProjects > 0
                      ? (dept.count / stats.totalProjects) * 100
                      : 0;
                  const deptProjects = reportData.projects.filter(
                    (p) => p.department === dept.department,
                  );
                  const avgProgress =
                    deptProjects.length > 0
                      ? deptProjects.reduce((sum, p) => sum + p.progress, 0) /
                        deptProjects.length
                      : 0;

                  return (
                    <div
                      key={dept.department}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {dept.department}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {dept.count} projects ({percentage.toFixed(1)}%)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-violet-600">
                            {Math.round(avgProgress)}%
                          </p>
                          <p className="text-xs text-gray-500">Avg Progress</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-violet-600 h-3 rounded-full transition-all"
                          style={{ width: `${avgProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No department data available
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Performance Report */}
      {selectedReport === "performance" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              System Performance Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  On-Time Completion
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {calculatedStats.completionRate}%
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Projects completed successfully
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Approval Rate
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats.totalProjects > 0
                    ? Math.round(
                        (calculatedStats.completedProjects /
                          stats.totalProjects) *
                          100,
                      )
                    : 0}
                  %
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Submitted projects approved
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Recent Submissions
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.recentSubmissions || 0}
                </p>
                <p className="text-xs text-gray-600 mt-2">Last 7 days</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Pending Reviews
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.pendingReviews || 0}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Awaiting evaluation
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Active Projects
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  {calculatedStats.inProgressProjects}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Currently in progress
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-indigo-600">
                  {(stats.totalStudents || 0) + (stats.totalSupervisors || 0)}
                </p>
                <p className="text-xs text-gray-600 mt-2">System-wide</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
