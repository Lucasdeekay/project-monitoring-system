# Project Monitoring System

A comprehensive web application for monitoring and managing academic projects with role-based access control for students, supervisors, and administrators.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/logout with JWT tokens
- **Role-Based Access Control**: Different interfaces for students, supervisors, and admins
- **Project Management**: Create, update, and track project progress
- **Real-time Feedback**: Supervisors can provide feedback on student projects
- **Evaluation System**: Structured evaluation and scoring of projects
- **Reporting**: Comprehensive reports and analytics
- **Document Management**: Upload and manage project documents

### User Roles
- **Students**: Submit projects, view feedback, track progress
- **Supervisors**: Review projects, provide feedback, conduct evaluations
- **Administrators**: Manage users, generate reports, oversee system

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Vite 7.2.4** - Fast build tool and development server
- **React Router DOM 7.12.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing
- **Hot Module Replacement** - Fast development refresh

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API server running on port 5000 (see Backend Setup)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Lucasdeekay/project-monitoring-system.git
cd project-monitoring-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layouts/          # Layout components
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   └── routes/           # Route definitions
│       └── AppRoutes.jsx
├── context/              # React Context providers
│   ├── AuthContext.jsx
│   └── useAuth.js
├── pages/
│   ├── auth/            # Authentication pages
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── admin/           # Admin dashboard pages
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── Users.jsx
│   │   └── Reports.jsx
│   ├── supervisor/      # Supervisor dashboard pages
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   └── ProjectDetails.jsx
│   ├── student/         # Student dashboard pages
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   └── ProjectDetails.jsx
│   └── shared/          # Shared pages
│       ├── Profile.jsx
│       └── NotFound.jsx
├── services/            # API service layer
│   └── api.js
├── mock/                # Mock data for development
│   └── data.js
├── assets/              # Static assets
├── main.jsx             # Application entry point
├── App.jsx              # Root component
├── input.css            # Tailwind CSS imports
└── output.css           # Generated Tailwind styles
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code linting

### Code Style

The project follows modern React development practices:
- Functional components with hooks
- Tailwind CSS for styling
- ES6+ syntax
- Context API for state management
- Axios for API communication

### API Integration

The frontend communicates with a backend API through a centralized service (`src/services/api.js`). The API includes:

- **Authentication**: Login, register, logout, profile management
- **Projects**: CRUD operations, submission, statistics
- **Feedback**: Create, update, read feedback
- **Evaluations**: Project evaluation and scoring
- **Users**: User management (admin only)
- **Reports**: Analytics and reporting
- **Documents**: File upload and management

## 🔐 Authentication

The application uses JWT-based authentication:
- Tokens stored in localStorage
- Automatic token injection via Axios interceptors
- Token expiration handling
- Role-based access control

## 🎨 Styling

- **Tailwind CSS 4.x** for utility-first styling
- **Responsive design** with mobile-first approach
- **Consistent color scheme** (violet-600 as primary)
- **Semantic color classes** for states (success, error, warning)

## 🌐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the browser.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**"process is not defined" Error**
- Ensure you're using `import.meta.env.VITE_API_URL` instead of `process.env.REACT_APP_API_URL`

**Fast Refresh Issues**
- Make sure components have only one export (prefer default exports)
- Check that hooks are in separate files if needed

**API Connection Issues**
- Verify the backend server is running on port 5000
- Check the `VITE_API_URL` environment variable
- Ensure CORS is configured on the backend

### Development Tips

- Run `npm run lint` before committing changes
- Test responsive design at different screen sizes
- Check browser console for errors
- Use React DevTools for debugging component state

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the code documentation in `AGENTS.md`

---

**Built with ❤️ using React, Vite, and Tailwind CSS**