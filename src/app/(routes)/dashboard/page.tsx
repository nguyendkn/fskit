import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import ProtectedRoute from '@/components/auth/protected-route';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/sign-in');
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <Button variant='outline' onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card className='mb-6 p-6'>
        <h2 className='mb-4 text-xl font-semibold'>Welcome, {user?.name || 'User'}</h2>
        <p className='text-gray-600'>
          You are now signed in to your account. This is a protected route that only authenticated
          users can access.
        </p>
      </Card>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Sample dashboard cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className='p-6'>
            <h3 className='mb-2 font-medium'>Dashboard Widget {i + 1}</h3>
            <p className='text-sm text-gray-500'>
              This is a placeholder for dashboard content. In a real application, this would display
              actual user data, statistics, or other relevant information.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
