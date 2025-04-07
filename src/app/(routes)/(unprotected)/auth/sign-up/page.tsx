import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { GalleryVerticalEnd } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/features/auth/stores/authStore';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Register the user using the auth store
      await register({ name, email, password });

      // Redirect to login page with success message
      router.push('/auth/sign-in?registered=true');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.');
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
              <CardTitle className='text-xl'>Create an account</CardTitle>
              <CardDescription>Enter your information to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className='grid gap-6'>
                  {error && (
                    <div className='p-3 text-sm text-red-500 bg-red-50 rounded-md'>{error}</div>
                  )}
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Full Name</Label>
                    <Input
                      id='name'
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='John Doe'
                      required
                    />
                  </div>
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
                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                      id='confirmPassword'
                      type='password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                  <div className='text-center text-sm'>
                    Already have an account?{' '}
                    <Link href='/auth/sign-in' className='underline underline-offset-4'>
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
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
