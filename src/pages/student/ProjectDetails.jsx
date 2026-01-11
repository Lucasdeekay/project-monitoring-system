import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  mockProjects,
  getFeedbackByProject,
  getEvaluationByProject,
} from "../../mock/data";

const StudentProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Get project data
  const project = mockProjects.find((p) => p.id === parseInt(id));
  const feedback = getFeedbackByProject(parseInt(id));
  const evaluation = getEvaluationByProject(parseInt(id));

  // If project not found
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
        <p className="text-gray-600 mt-2">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/student/projects"
          className="inline-block mt-6 px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      submitted: "bg-green-100 text-green-800",
      under_review: "bg-yellow-100 text-yellow-800",
      approved: "bg-emerald-100 text-emerald-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/student/projects")}
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
        </div>

        {/* Project Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-1">Supervisor</p>
            <p className="font-medium text-gray-900">
              {project.supervisorName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Department</p>
            <p className="font-medium text-gray-900">{project.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Progress</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-violet-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="font-medium text-gray-900">
                {project.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {["overview", "documents", "feedback", "evaluation"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-violet-600 text-violet-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Objectives */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Project Objectives
                </h3>
                <ul className="space-y-2">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-violet-50 text-violet-700 text-sm font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(project.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      Expected Completion
                    </p>
                    <p className="font-medium text-gray-900">
                      {new Date(
                        project.expectedCompletionDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {project.submissionDate && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Submitted On</p>
                      <p className="font-medium text-gray-900">
                        {new Date(project.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Project Documents
                </h3>
                <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors">
                  Upload Document
                </button>
              </div>

              {project.documents.length > 0 ? (
                <div className="space-y-3">
                  {project.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-violet-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {doc.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {doc.type.charAt(0).toUpperCase() +
                              doc.type.slice(1)}{" "}
                            • {doc.size} • Uploaded{" "}
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-violet-600 transition-colors">
                          <svg
                            className="w-5 h-5"
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
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    No documents uploaded yet
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Supervisor Feedback
              </h3>

              {feedback.length > 0 ? (
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {item.subject}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            From {item.supervisorName} •{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < item.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 whitespace-pre-line">
                        {item.message}
                      </p>
                      <span
                        className={`inline-block mt-3 px-2 py-1 rounded text-xs font-medium ${
                          item.type === "general"
                            ? "bg-blue-100 text-blue-800"
                            : item.type === "chapter"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.type.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    No feedback received yet
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Evaluation Tab */}
          {activeTab === "evaluation" && (
            <div className="space-y-6">
              {evaluation ? (
                <>
                  {/* Overall Score */}
                  <div className="bg-gradient-to-r from-violet-50 to-violet-100 rounded-lg p-6 text-center">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Final Grade
                    </p>
                    <p className="text-5xl font-bold text-violet-600 mb-2">
                      {evaluation.grade}
                    </p>
                    <p className="text-lg text-gray-700">
                      {evaluation.totalScore}/{evaluation.maxTotalScore} points
                    </p>
                  </div>

                  {/* Evaluation Criteria */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Evaluation Breakdown
                    </h3>
                    <div className="space-y-4">
                      {evaluation.criteria.map((criterion, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {criterion.name}
                            </h4>
                            <span className="text-lg font-semibold text-violet-600">
                              {criterion.score}/{criterion.maxScore}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-violet-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  (criterion.score / criterion.maxScore) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {criterion.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General Comment */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Evaluator's Comments
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {evaluation.generalComment}
                    </p>
                    <p className="text-sm text-gray-600 mt-4">
                      Evaluated by {evaluation.evaluatorName} on{" "}
                      {new Date(evaluation.evaluatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Project has not been evaluated yet
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors">
            Edit Project
          </button>
          {project.status === "in_progress" && (
            <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
              Submit for Review
            </button>
          )}
          <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Download Report
          </button>
          <button className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors">
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProjectDetails;
