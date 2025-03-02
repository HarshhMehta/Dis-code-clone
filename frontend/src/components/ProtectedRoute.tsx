import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';
import { checkAuthStatus } from '../store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  
  // Add fallback with default values to prevent destructuring errors
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth?.isAuthenticated || false;
  const loading = auth?.loading || false;
  
  useEffect(() => {
    // Dispatch the auth check only if the function exists
    if (typeof checkAuthStatus === 'function') {
      dispatch(checkAuthStatus());
    } else {
      console.error('checkAuthStatus is not a valid action creator');
    }
  }, [dispatch]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#36393f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5865f2]"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};