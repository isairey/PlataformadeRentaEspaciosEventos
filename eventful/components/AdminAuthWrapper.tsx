"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, getCurrentUser } from '@/lib/auth';

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdminAuth = () => {
      const adminAccess = isAdmin();
      const currentUser = getCurrentUser();
      
      if (!adminAccess) {
        // Store the current admin URL for potential redirect after login
        if (typeof window !== 'undefined') {
          localStorage.setItem('redirectAfterLogin', window.location.pathname);
        }
        
        // If user is logged in but not admin, redirect to user dashboard
        if (currentUser && currentUser.role === 'USER') {
          alert('Access denied. Admin privileges required.');
          router.push('/');
        } else {
          // Not logged in at all, redirect to signin
          router.push('/signin');
        }
        return;
      }
      
      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAdminAuth();
  }, [router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Admin Access</h2>
          <p className="text-gray-600">Please wait while we check your permissions...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not authorized (will redirect)
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}