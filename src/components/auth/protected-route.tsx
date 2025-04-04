'use client';

import { useAuthStore } from '@/features/auth/stores/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const authValid = checkAuth();

    if (!authValid) {
      // Redirect to login page if not authenticated
      router.push(`/auth/sign-in?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router, pathname, checkAuth]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary'></div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
}
