import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Lazy loading pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Jobs = lazy(() => import('./pages/Jobs'));
const Internships = lazy(() => import('./pages/Internships'));
const Events = lazy(() => import('./pages/Events'));
const Profile = lazy(() => import('./pages/Profile'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const ATSScanner = lazy(() => import('./pages/ATSScanner'));
const SkillAssessment = lazy(() => import('./pages/SkillAssessment'));

// Loading component
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <div className="loader">Loading...</div>
  </div>
);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/internships" element={<Internships />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/recommendations"
                    element={
                      <ProtectedRoute>
                        <Recommendations />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/resume-builder"
                    element={
                      <ProtectedRoute>
                        <ResumeBuilder />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ats-scanner"
                    element={
                      <ProtectedRoute>
                        <ATSScanner />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/assessment"
                    element={
                      <ProtectedRoute>
                        <SkillAssessment />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
        <Chatbot />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
