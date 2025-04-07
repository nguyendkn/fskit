import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { GalleryVerticalEnd } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // In a real app, you would call an API endpoint to handle password reset
      // This is just a mockup for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock success
      setSuccess(true);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send password reset email. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

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
              <CardTitle className='text-xl'>Forgot password</CardTitle>
              <CardDescription>Enter your email to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className='flex flex-col gap-6'>
                  <div className='p-3 text-sm text-green-700 bg-green-50 rounded-md'>
                    Password reset email sent. Please check your inbox for instructions.
                  </div>
                  <Button asChild>
                    <Link href='/auth/sign-in'>Return to login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className='grid gap-6'>
                    {error && (
                      <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md'>{error}</div>
                    )}
                    <div className='grid gap-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='m@example.com'
                        required
                      />
                    </div>
                    <Button type='submit' className='w-full' disabled={isLoading}>
                      {isLoading ? 'Sending...' : 'Send reset instructions'}
                    </Button>
                    <div className='text-center text-sm'>
                      Remember your password?{' '}
                      <Link href='/auth/sign-in' className='underline underline-offset-4'>
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              )}
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
