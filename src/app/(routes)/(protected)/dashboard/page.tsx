'use client';

import ProtectedRoute from '@/components/auth/protected-route';
import { SiteHeader } from '@/components/Layout/site-header';
import { SectionCards } from '@/components/Layout/section-cards';
import { ChartAreaInteractive } from '@/components/Layout/chart-area-interactive';
import { DataTable } from '@/components/Layout/data-table';
import data from './data.json';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContainer />
    </ProtectedRoute>
  );
}

function DashboardContainer() {
  return (
    <>
      <SiteHeader />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <SectionCards />
            <div className='px-4 lg:px-6'>
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
    // <div className='container mx-auto p-6'>
    //   <div className='mb-8 flex items-center justify-between'>
    //     <h1 className='text-3xl font-bold'>Dashboard</h1>
    //     <Button variant='outline' onClick={handleLogout}>
    //       Logout
    //     </Button>
    //   </div>

    //   <Card className='mb-6 p-6'>
    //     <h2 className='mb-4 text-xl font-semibold'>Welcome, {user?.name || 'User'}</h2>
    //     <p className='text-gray-600'>
    //       You are now signed in to your account. This is a protected route that only authenticated
    //       users can access.
    //     </p>
    //   </Card>

    //   <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
    //     {/* Sample dashboard cards */}
    //     {Array.from({ length: 6 }).map((_, i) => (
    //       <Card key={i} className='p-6'>
    //         <h3 className='mb-2 font-medium'>Dashboard Widget {i + 1}</h3>
    //         <p className='text-sm text-gray-500'>
    //           This is a placeholder for dashboard content. In a real application, this would display
    //           actual user data, statistics, or other relevant information.
    //         </p>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
  );
}
