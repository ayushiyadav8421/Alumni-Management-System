import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const token = localStorage.getItem('alumniToken');
  const userStr = localStorage.getItem('alumniUser');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!token || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role.toLowerCase() !== requiredRole.toLowerCase()) {
    // Access denied if role doesn't match
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-theme-bg px-4">
        <div className="premium-card bg-theme-card p-12 text-center max-w-lg shadow-2xl border border-theme-border">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h2>
          <p className="text-theme-muted mb-8 text-lg">
            This page is restricted to {requiredRole}s only. Students cannot access this feature.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-university-green text-white font-bold py-3 px-10 rounded-full hover:bg-university-olive transition-all shadow-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
