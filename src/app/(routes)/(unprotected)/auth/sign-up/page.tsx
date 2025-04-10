import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import Link from 'next/link';
import { GalleryVerticalEnd } from 'lucide-react';
import { SignUpForm } from '@/components/Forms/SignUpForm';

export default function SignUpPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link href='/' className='flex items-center gap-2 self-center font-medium'>
          <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
            <GalleryVerticalEnd className='size-4' />
          </div>
          Acme Inc.
        </Link>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader className='text-center'>
              <CardTitle className='text-xl'>Create an account</CardTitle>
              <CardDescription>Enter your information to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm />
              <div className='text-center text-sm'>
                Already have an account?{' '}
                <Link href='/auth/sign-in' className='underline underline-offset-4'>
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary'>
            By clicking continue, you agree to our <Link href='/terms'>Terms of Service</Link> and{' '}
            <Link href='/privacy'>Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
