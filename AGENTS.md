# AGENTS.md - Project Monitoring System

This file contains guidelines and commands for agentic coding agents working in this React project monitoring system.

## Build Commands

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint for code linting
```

### Testing
This project currently has no test framework configured. To add tests:
1. Install a testing framework (Jest, Vitest, etc.)
2. Add test scripts to package.json
3. Create test files with `.test.js` or `.spec.js` extensions

## Project Architecture

### Tech Stack
- **Frontend**: React 19.2.0 with Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **Styling**: Tailwind CSS 4.1.18 with Vite plugin
- **State Management**: React Context API (AuthContext)
- **API**: Axios with interceptors for authentication

### Directory Structure
```
src/
├── app/
│   ├── layouts/          # Layout components (DashboardLayout, AuthLayout)
│   └── routes/           # Route definitions (AppRoutes)
├── context/              # React Context providers (AuthContext)
├── pages/
│   ├── auth/            # Authentication pages (Login, Register)
│   ├── admin/           # Admin dashboard pages
│   ├── supervisor/      # Supervisor dashboard pages
│   ├── student/         # Student dashboard pages
│   └── shared/          # Shared pages (Profile, NotFound)
├── services/            # API service layer (api.js)
├── mock/                # Mock data for development
├── assets/              # Static assets
├── main.jsx             # Application entry point
├── App.jsx              # Root component
├── input.css            # Tailwind CSS imports
└── output.css           # Generated Tailwind styles
```

## Code Style Guidelines

### Imports
- Use ES6 import/export syntax
- Group imports in this order:
  1. React and core libraries
  2. Third-party libraries
  3. Internal components (relative paths)
  4. Services and utilities
  6. CSS files (if any)

```jsx
// React and core libraries
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Internal components
import DashboardLayout from '../app/layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';

// Services
import { authAPI } from '../services/api';
```

### Component Structure
- Use functional components with hooks
- Follow PascalCase for component names
- Use camelCase for variables and functions
- Export components as default

```jsx
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  const handleClick = () => {
    // Event handlers
  };
  
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### Naming Conventions
- **Components**: PascalCase (UserProfile, DashboardLayout)
- **Files**: PascalCase for components (UserProfile.jsx), camelCase for utilities (apiService.js)
- **Variables**: camelCase (userName, isLoading)
- **Constants**: UPPER_SNAKE_CASE (API_BASE_URL, MAX_FILE_SIZE)
- **Functions**: camelCase (handleSubmit, getUserData)
- **CSS Classes**: Use Tailwind utility classes, avoid custom CSS

### State Management
- Use React Context for global state (authentication, user data)
- Use useState for local component state
- Use useEffect for side effects and API calls
- Use custom hooks for complex logic

```jsx
// Context pattern
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const value = { user, login, logout };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

### API Integration
- All API calls should use the centralized api.js service
- Use async/await for API operations
- Handle errors with try/catch blocks
- Use the response format: `{ success: boolean, data: any, message: string }`

```jsx
const handleSubmit = async (formData) => {
  setLoading(true);
  try {
    const response = await authAPI.login(formData.email, formData.password);
    if (response.success) {
      // Handle success
      navigate('/dashboard');
    } else {
      setError(response.message);
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Error Handling
- Use try/catch for async operations
- Display user-friendly error messages
- Log technical errors to console
- Handle loading states appropriately

```jsx
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const operation = async () => {
  try {
    setLoading(true);
    setError('');
    const result = await apiCall();
    // Handle success
  } catch (err) {
    console.error('Operation failed:', err);
    setError(err.message || 'Operation failed');
  } finally {
    setLoading(false);
  }
};
```

### Styling with Tailwind CSS
- Use Tailwind utility classes exclusively
- Follow mobile-first responsive design
- Use consistent color scheme (violet-600 as primary)
- Use semantic color classes (red for errors, green for success)

```jsx
<div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
      Submit
    </button>
    {error && (
      <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    )}
  </div>
</div>
```

### Forms
- Use controlled components
- Handle form state with useState
- Validate inputs before submission
- Provide clear error messages

```jsx
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Validation and submission
};
```

### Routing
- Use React Router for navigation
- Implement protected routes for authenticated users
- Use role-based routing for different user types
- Handle 404 pages gracefully

### Authentication Flow
- Store JWT tokens in localStorage
- Use axios interceptors for automatic token injection
- Handle token expiration and logout
- Implement role-based access control

## Development Guidelines

### Before Making Changes
1. Read existing code to understand patterns
2. Check if similar functionality already exists
3. Follow established naming conventions
4. Consider reusability and component composition

### After Making Changes
1. Run `npm run lint` to check code quality
2. Test the functionality manually
3. Ensure responsive design works
4. Check for console errors

### Best Practices
- Keep components small and focused
- Use descriptive variable and function names
- Add JSDoc comments for complex functions
- Avoid inline styles, use Tailwind classes
- Implement proper loading and error states
- Use semantic HTML elements
- Ensure accessibility (ARIA labels, keyboard navigation)

### Performance Considerations
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid unnecessary re-renders
- Use lazy loading for large components
- Optimize bundle size with dynamic imports

## Environment Configuration

### Development Variables
- `REACT_APP_API_URL`: Backend API base URL (defaults to http://localhost:5000/api)

### API Integration
The project expects a backend API running on port 5000. The API service includes:
- Authentication endpoints
- Project management
- User management
- Feedback and evaluation systems
- Report generation

## Common Patterns

### Dashboard Layout Pattern
```jsx
const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <nav>{/* Navigation */}</nav>
      <aside>{/* Sidebar */}</aside>
      <main>{children}</main>
    </div>
  );
};
```

### API Service Pattern
```jsx
export const resourceAPI = {
  getAll: async (params = {}) => api.get('/resource', { params }),
  getById: async (id) => api.get(`/resource/${id}`),
  create: async (data) => api.post('/resource', data),
  update: async (id, data) => api.put(`/resource/${id}`, data),
  delete: async (id) => api.delete(`/resource/${id}`)
};
```

### Form Pattern
```jsx
const [formData, setFormData] = useState(initialState);
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Submit logic
};
```

This project follows modern React development practices with a focus on maintainability, scalability, and user experience.