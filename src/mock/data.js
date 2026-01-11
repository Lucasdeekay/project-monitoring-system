/**
 * Mock Data for Development
 *
 * This file contains sample data to simulate backend responses
 * Used throughout the application until real backend is integrated
 */

// ==================== MOCK USERS ====================

export const mockUsers = {
  students: [
    {
      id: 1,
      name: "John Doe",
      email: "student@example.com",
      role: "student",
      matricNumber: "CSC/2020/001",
      department: "Computer Science",
      level: "400",
      phone: "+234 801 234 5678",
      avatar: null,
    },
    {
      id: 4,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "student",
      matricNumber: "CSC/2020/015",
      department: "Computer Science",
      level: "400",
      phone: "+234 802 345 6789",
      avatar: null,
    },
  ],
  supervisors: [
    {
      id: 2,
      name: "Dr. Jane Smith",
      email: "supervisor@example.com",
      role: "supervisor",
      department: "Computer Science",
      title: "Senior Lecturer",
      phone: "+234 803 456 7890",
      specialization: "Artificial Intelligence",
      avatar: null,
    },
    {
      id: 5,
      name: "Prof. Michael Brown",
      email: "mbrown@example.com",
      role: "supervisor",
      department: "Computer Science",
      title: "Professor",
      phone: "+234 804 567 8901",
      specialization: "Software Engineering",
      avatar: null,
    },
  ],
  admins: [
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      department: "Administration",
      phone: "+234 805 678 9012",
      avatar: null,
    },
  ],
};

// ==================== MOCK PROJECTS ====================

export const mockProjects = [
  {
    id: 1,
    title: "E-Learning Platform for Nigerian Universities",
    description:
      "A comprehensive web-based learning management system tailored for Nigerian educational institutions.",
    studentId: 1,
    studentName: "John Doe",
    supervisorId: 2,
    supervisorName: "Dr. Jane Smith",
    department: "Computer Science",
    status: "in_progress", // draft, in_progress, submitted, under_review, approved, rejected
    progress: 65,
    startDate: "2024-09-01",
    submissionDate: null,
    expectedCompletionDate: "2025-04-30",
    objectives: [
      "Develop user-friendly interface for students and lecturers",
      "Implement secure authentication system",
      "Create course management module",
      "Build assignment submission and grading system",
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    documents: [
      {
        id: 1,
        name: "Project Proposal.pdf",
        type: "proposal",
        uploadDate: "2024-09-15",
        size: "2.3 MB",
        url: "#",
      },
      {
        id: 2,
        name: "Chapter 1 - Introduction.pdf",
        type: "chapter",
        uploadDate: "2024-10-20",
        size: "1.8 MB",
        url: "#",
      },
    ],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2025-01-05T14:30:00Z",
  },
  {
    id: 2,
    title: "Mobile Health Monitoring System",
    description:
      "Android application for remote patient monitoring and health data tracking.",
    studentId: 4,
    studentName: "Alice Johnson",
    supervisorId: 5,
    supervisorName: "Prof. Michael Brown",
    department: "Computer Science",
    status: "submitted",
    progress: 100,
    startDate: "2024-09-01",
    submissionDate: "2025-01-08",
    expectedCompletionDate: "2025-04-30",
    objectives: [
      "Design intuitive mobile interface",
      "Implement real-time health data tracking",
      "Develop emergency alert system",
      "Ensure HIPAA compliance",
    ],
    technologies: ["React Native", "Firebase", "TensorFlow Lite"],
    documents: [
      {
        id: 3,
        name: "Complete Project Documentation.pdf",
        type: "final",
        uploadDate: "2025-01-08",
        size: "5.7 MB",
        url: "#",
      },
    ],
    createdAt: "2024-09-01T10:00:00Z",
    updatedAt: "2025-01-08T16:45:00Z",
  },
];

// ==================== MOCK FEEDBACK ====================

export const mockFeedback = [
  {
    id: 1,
    projectId: 1,
    supervisorId: 2,
    supervisorName: "Dr. Jane Smith",
    type: "general", // general, chapter, milestone
    subject: "Project Proposal Review",
    message:
      "Your proposal is well-structured. However, please expand on the methodology section and include a more detailed timeline. Also consider adding a risk assessment section.",
    rating: 4, // 1-5
    status: "read", // unread, read
    createdAt: "2024-09-20T11:30:00Z",
  },
  {
    id: 2,
    projectId: 1,
    supervisorId: 2,
    supervisorName: "Dr. Jane Smith",
    type: "chapter",
    subject: "Chapter 1 Feedback",
    message:
      "Good introduction to the problem domain. Please add more recent references (2022-2024) and strengthen the justification for your chosen approach.",
    rating: 3,
    status: "read",
    createdAt: "2024-10-25T14:20:00Z",
  },
  {
    id: 3,
    projectId: 2,
    supervisorId: 5,
    supervisorName: "Prof. Michael Brown",
    type: "general",
    subject: "Final Submission Review",
    message:
      "Excellent work! The project meets all requirements. The implementation is solid and the documentation is comprehensive. Ready for evaluation.",
    rating: 5,
    status: "unread",
    createdAt: "2025-01-09T09:15:00Z",
  },
];

// ==================== MOCK EVALUATIONS ====================

export const mockEvaluations = [
  {
    id: 1,
    projectId: 2,
    evaluatorId: 5,
    evaluatorName: "Prof. Michael Brown",
    evaluatorRole: "supervisor",
    criteria: [
      {
        name: "Problem Definition",
        maxScore: 10,
        score: 9,
        comment: "Clear and well-articulated problem statement",
      },
      {
        name: "Literature Review",
        maxScore: 10,
        score: 8,
        comment: "Comprehensive review with relevant sources",
      },
      {
        name: "Methodology",
        maxScore: 15,
        score: 13,
        comment: "Sound methodology with minor improvements needed",
      },
      {
        name: "Implementation",
        maxScore: 25,
        score: 22,
        comment: "Well-implemented with good code quality",
      },
      {
        name: "Testing & Validation",
        maxScore: 15,
        score: 13,
        comment: "Adequate testing coverage",
      },
      {
        name: "Documentation",
        maxScore: 15,
        score: 14,
        comment: "Excellent documentation",
      },
      {
        name: "Presentation",
        maxScore: 10,
        score: 9,
        comment: "Clear and professional presentation",
      },
    ],
    totalScore: 88,
    maxTotalScore: 100,
    grade: "A",
    generalComment:
      "Outstanding project that demonstrates strong technical skills and thorough understanding of the subject matter. The student has successfully delivered a working solution that meets industry standards.",
    status: "completed", // pending, completed
    evaluatedAt: "2025-01-09T16:00:00Z",
  },
];

// ==================== MOCK NOTIFICATIONS ====================

export const mockNotifications = [
  {
    id: 1,
    userId: 1,
    type: "feedback", // feedback, evaluation, submission, reminder
    title: "New Feedback Received",
    message: "Dr. Jane Smith provided feedback on Chapter 1",
    read: false,
    actionUrl: "/student/projects/1/feedback",
    createdAt: "2024-10-25T14:25:00Z",
  },
  {
    id: 2,
    userId: 1,
    type: "reminder",
    title: "Submission Deadline Approaching",
    message: "Your project submission is due in 15 days",
    read: false,
    actionUrl: "/student/projects/1",
    createdAt: "2025-01-08T08:00:00Z",
  },
  {
    id: 3,
    userId: 2,
    type: "submission",
    title: "New Project Submitted",
    message: "Alice Johnson submitted Mobile Health Monitoring System",
    read: true,
    actionUrl: "/supervisor/projects/2",
    createdAt: "2025-01-08T16:50:00Z",
  },
];

// ==================== MOCK STATISTICS ====================

export const mockStats = {
  student: {
    projectProgress: 65,
    feedbackReceived: 5,
    pendingTasks: 3,
    daysUntilDeadline: 110,
  },
  supervisor: {
    totalProjects: 8,
    pendingReviews: 2,
    completedEvaluations: 3,
    studentsSupervised: 8,
  },
  admin: {
    totalProjects: 45,
    totalStudents: 45,
    totalSupervisors: 12,
    projectsByStatus: {
      draft: 5,
      in_progress: 25,
      submitted: 10,
      under_review: 3,
      approved: 2,
      rejected: 0,
    },
    projectsByDepartment: {
      "Computer Science": 20,
      "Information Technology": 15,
      "Software Engineering": 10,
    },
  },
};

// Helper function to get user by ID
export const getUserById = (userId) => {
  const allUsers = [
    ...mockUsers.students,
    ...mockUsers.supervisors,
    ...mockUsers.admins,
  ];
  return allUsers.find((user) => user.id === userId);
};

// Helper function to get projects by user role
export const getProjectsByUser = (userId, role) => {
  if (role === "student") {
    return mockProjects.filter((project) => project.studentId === userId);
  } else if (role === "supervisor") {
    return mockProjects.filter((project) => project.supervisorId === userId);
  }
  return mockProjects; // admin sees all
};

// Helper function to get feedback by project
export const getFeedbackByProject = (projectId) => {
  return mockFeedback.filter((feedback) => feedback.projectId === projectId);
};

// Helper function to get evaluation by project
export const getEvaluationByProject = (projectId) => {
  return mockEvaluations.find(
    (evaluation) => evaluation.projectId === projectId
  );
};
