import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  const publicPath = pathname === '/login' || pathname === '/signup';

  if (!token && !publicPath) {
    return <Navigate to="/login" replace />;
  }

  if (token && publicPath) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;