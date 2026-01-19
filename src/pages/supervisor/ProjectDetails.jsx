import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const SupervisorProjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [project, setProject] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [statistics, setStatistics] = useState(null);

  // Modal states
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    subject: "",
    message: "",
    rating: 0,
    type: "general",
  });

  // Evaluation form state
  const [evaluationForm, setEvaluationForm] = useState({
    criteria: [
      { name: "Research Quality", score: 0, maxScore: 20, comment: "" },
      { name: "Implementation", score: 0, maxScore: 30, comment: "" },
      { name: "Documentation", score: 0, maxScore: 20, comment: "" },
      { name: "Presentation", score: 0, maxScore: 15, comment: "" },
      { name: "Innovation", score: 0, maxScore: 15, comment: "" },
    ],
    generalComment: "",
  });

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch project details
      const projectRes = await api.get(`/projects/${id}`);
      setProject(projectRes.data);

      // Fetch feedback
      const feedbackRes = await api.get(`/feedback/project/${id}`);
      setFeedbackList(feedbackRes.data);

      // Fetch evaluations
      const evalRes = await api.get(`/evaluations/project/${id}`);
      if (evalRes.data && evalRes.data.length > 0) {
        setEvaluation(evalRes.data[0]);
      }

      // Fetch statistics
      const statsRes = await api.get(`/projects/${id}/statistics`);
      setStatistics(statsRes.data);
    } catch (err) {
      console.error("Error fetching project data:", err);
      setError(err.message || "Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackForm.subject || !feedbackForm.message) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/feedback", {
        projectId: parseInt(id),
        ...feedbackForm,
      });

      alert("Feedback submitted successfully!");
      setShowFeedbackModal(false);
      setFeedbackForm({
        subject: "",
        message: "",
        rating: 0,
        type: "general",
      });
      fetchProjectData(); // Refresh data
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert(err.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEvaluationSubmit = async (e) => {
    e.preventDefault();

    // Validate all criteria have scores
    const hasEmptyScores = evaluationForm.criteria.some(
      (c) => c.score === 0 || c.score === "",
    );

    if (hasEmptyScores) {
      alert("Please score all criteria");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/evaluations", {
        projectId: parseInt(id),
        criteria: evaluationForm.criteria,
        generalComment: evaluationForm.generalComment,
      });

      alert("Evaluation submitted successfully!");
      setShowEvaluationModal(false);
      fetchProjectData(); // Refresh data
    } catch (err) {
      console.error("Error submitting evaluation:", err);
      alert(err.message || "Failed to submit evaluation");
    } finally {
      setSubmitting(false);
    }
  };

  const updateCriterionScore = (index, score) => {
    const newCriteria = [...evaluationForm.criteria];
    newCriteria[index].score = Math.min(
      parseInt(score) || 0,
      newCriteria[index].maxScore,
    );
    setEvaluationForm({ ...evaluationForm, criteria: newCriteria });
  };

  const updateCriterionComment = (index, comment) => {
    const newCriteria = [...evaluationForm.criteria];
    newCriteria[index].comment = comment;
    setEvaluationForm({ ...evaluationForm, criteria: newCriteria });
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
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
          <h2 className="text-2xl font-bold text-gray-900 mt-4">
            {error || "Project Not Found"}
          </h2>
          <p className="text-gray-600 mt-2">
            The project you're looking for doesn't exist or you don't have
            access to it.
          </p>
          <Link
            to="/supervisor/projects"
            className="mt-6 inline-flex items-center px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600">
        <Link to="/supervisor/projects" className="hover:text-violet-600">
          Supervised Projects
        </Link>
        <svg
          className="w-4 h-4 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-900 font-medium">{project.title}</span>
      </nav>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              {project.title}
            </h1>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-1 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>
                  Student:{" "}
                  <span className="font-medium">{project.student?.name}</span>
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600">
                {project.department}
              </span>
            </div>
          </div>
          <span
            className={`ml-4 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(project.status)}`}
          >
            {project.status.replace("_", " ").toUpperCase()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowFeedbackModal(true)}
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Provide Feedback
          </button>
          {(project.status === "submitted" ||
            project.status === "under_review") &&
            !evaluation && (
              <button
                onClick={() => setShowEvaluationModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Evaluate Project
              </button>
            )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase">Progress</p>
            <p className="text-2xl font-bold text-violet-600 mt-1">
              {project.progress}%
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase">Documents</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {statistics?.documents || project.documents?.length || 0}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase">Feedback Given</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {feedbackList.length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase">Evaluation</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {evaluation ? evaluation.grade : "Pending"}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {["overview", "documents", "feedback", "evaluation"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? "border-violet-600 text-violet-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Student
                    </label>
                    <p className="mt-1 text-gray-900">
                      {project.student?.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">
                      {project.student?.email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <p className="mt-1 text-gray-900">{project.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <p className="mt-1 text-gray-900">
                      {project.startDate
                        ? new Date(project.startDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  {project.expectedCompletionDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Expected Completion
                      </label>
                      <p className="mt-1 text-gray-900">
                        {new Date(
                          project.expectedCompletionDate,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {project.submissionDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Submission Date
                      </label>
                      <p className="mt-1 text-gray-900">
                        {new Date(project.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {project.objectives && project.objectives.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Project Objectives
                  </h3>
                  <ul className="space-y-2">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0"
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
              )}

              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Overall Progress
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">
                      Completion
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-violet-600 h-3 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Documents
              </h3>
              {project.documents && project.documents.length > 0 ? (
                <div className="space-y-3">
                  {project.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-violet-300 transition-colors"
                    >
                      <div className="flex items-center flex-1">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-6 h-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {doc.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span>{doc.fileSize || "Unknown size"}</span>
                            <span>•</span>
                            <span>
                              Uploaded{" "}
                              {new Date(doc.uploadDate).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className="capitalize">{doc.type}</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-gray-600 hover:text-violet-600 hover:bg-gray-100 rounded-lg transition-colors">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Feedback History
                </h3>
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Add Feedback
                </button>
              </div>

              {feedbackList.length > 0 ? (
                <div className="space-y-4">
                  {feedbackList.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-violet-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {feedback.subject}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(feedback.createdAt).toLocaleDateString()}{" "}
                            •{" "}
                            {new Date(feedback.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        {feedback.rating && (
                          <div className="flex items-center ml-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-5 h-5 ${
                                  i < feedback.rating
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
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {feedback.message}
                      </p>
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
                    No feedback provided yet
                  </p>
                  <button
                    onClick={() => setShowFeedbackModal(true)}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Provide First Feedback
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Evaluation Tab */}
          {activeTab === "evaluation" && (
            <div>
              {evaluation ? (
                <div className="space-y-6">
                  <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Final Evaluation
                      </h3>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-violet-600">
                          {evaluation.totalScore}/{evaluation.maxTotalScore}
                        </p>
                        <p className="text-sm text-gray-600">
                          Grade:{" "}
                          <span className="font-bold text-gray-900">
                            {evaluation.grade}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Evaluated on{" "}
                      {new Date(evaluation.evaluatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Evaluation Criteria
                    </h4>
                    <div className="space-y-4">
                      {evaluation.criteria.map((criterion, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">
                              {criterion.name}
                            </h5>
                            <span className="text-lg font-bold text-violet-600">
                              {criterion.score}/{criterion.maxScore}
                            </span>
                          </div>
                          {criterion.comment && (
                            <p className="text-sm text-gray-600 mb-3">
                              {criterion.comment}
                            </p>
                          )}
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-violet-600 h-2 rounded-full"
                              style={{
                                width: `${(criterion.score / criterion.maxScore) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {evaluation.generalComment && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        General Comments
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {evaluation.generalComment}
                      </p>
                    </div>
                  )}
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    Project not yet evaluated
                  </p>
                  {(project.status === "submitted" ||
                    project.status === "under_review") && (
                    <button
                      onClick={() => setShowEvaluationModal(true)}
                      className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Evaluate Now
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Provide Feedback
            </h3>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback Type
                </label>
                <select
                  value={feedbackForm.type}
                  onChange={(e) =>
                    setFeedbackForm({ ...feedbackForm, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="progress">Progress Update</option>
                  <option value="concern">Concern</option>
                  <option value="praise">Praise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={feedbackForm.subject}
                  onChange={(e) =>
                    setFeedbackForm({
                      ...feedbackForm,
                      subject: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Brief summary of feedback"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows="6"
                  value={feedbackForm.message}
                  onChange={(e) =>
                    setFeedbackForm({
                      ...feedbackForm,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Detailed feedback for the student..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (Optional)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setFeedbackForm({ ...feedbackForm, rating })
                      }
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-8 h-8 ${
                          rating <= feedbackForm.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  {feedbackForm.rating > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setFeedbackForm({ ...feedbackForm, rating: 0 })
                      }
                      className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {showEvaluationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Evaluate Project
            </h3>

            <form onSubmit={handleEvaluationSubmit} className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Evaluation Criteria
                </h4>

                {evaluationForm.criteria.map((criterion, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-900">
                        {criterion.name}
                      </h5>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max={criterion.maxScore}
                          value={criterion.score}
                          onChange={(e) =>
                            updateCriterionScore(index, e.target.value)
                          }
                          className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                          required
                        />
                        <span className="text-gray-600">
                          / {criterion.maxScore}
                        </span>
                      </div>
                    </div>
                    <textarea
                      rows="2"
                      value={criterion.comment}
                      onChange={(e) =>
                        updateCriterionComment(index, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                      placeholder="Comments for this criterion (optional)"
                    />
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(criterion.score / criterion.maxScore) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  General Comments
                </label>
                <textarea
                  rows="4"
                  value={evaluationForm.generalComment}
                  onChange={(e) =>
                    setEvaluationForm({
                      ...evaluationForm,
                      generalComment: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Overall comments and recommendations..."
                />
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    Total Score:
                  </span>
                  <span className="text-2xl font-bold text-violet-600">
                    {evaluationForm.criteria.reduce(
                      (sum, c) => sum + (parseInt(c.score) || 0),
                      0,
                    )}{" "}
                    /{" "}
                    {evaluationForm.criteria.reduce(
                      (sum, c) => sum + c.maxScore,
                      0,
                    )}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEvaluationModal(false)}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Evaluation"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorProjectDetails;
