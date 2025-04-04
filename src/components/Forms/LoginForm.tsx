import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';
import { useAuthStore } from '@/features/auth/stores/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { t } = useTranslation('common');
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      // Redirect or show success message
    } catch (error) {
      // Handle error
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          {t('auth.email')}
        </label>
        <input
          id='email'
          type='email'
          {...register('email')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
        />
        {errors.email && <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          {t('auth.password')}
        </label>
        <input
          id='password'
          type='password'
          {...register('password')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
        />
        {errors.password && <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>}
      </div>

      <div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50'
        >
          {isSubmitting ? 'Loading...' : t('auth.login')}
        </button>
      </div>
    </form>
  );
}
