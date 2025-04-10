import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function SignUpForm() {
  const { t } = useTranslation('common');
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  const {
    register: registerInput,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data);
      router.push('/auth/sign-in'); // Redirect to sign-in page after successful registration
    } catch (error: any) {
      setError('root', { message: error.message });
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
          {t('auth.name')}
        </label>
        <input
          id='name'
          type='text'
          {...registerInput('name')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
        />
        {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          {t('auth.email')}
        </label>
        <input
          id='email'
          type='email'
          {...registerInput('email')}
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
          {...registerInput('password')}
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
          {isSubmitting ? 'Loading...' : t('auth.register')}
        </button>
      </div>
    </form>
  );
}
