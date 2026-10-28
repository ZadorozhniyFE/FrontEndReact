import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './Register.module.css';


const registerSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
   agree: z.boolean().refine((val) => val === true, {
  message: 'You must agree to the terms',
}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', 
  });

  const email = watch('email');
  const password = watch('password');
  const agree = watch('agree');

  const isButtonDisabled = !email || !password || !agree || isSubmitting || !isValid;

  const onSubmit = async (data: RegisterFormValues) => {
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={`${styles.formCard} ${styles.successCard}`}>
          <h2 className={styles.successTitle}>Registration Successful!</h2>
          <p className={styles.successText}>
            Your account has been created successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="you@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <span id="email-error" className={styles.errorText} role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="••••••••"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <span id="password-error" className={styles.errorText} role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="••••••••"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className={styles.errorText} role="alert">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Agree Checkbox */}
          <div className={styles.checkboxGroup}>
            <input
              id="agree"
              type="checkbox"
              className={styles.checkbox}
              aria-invalid={errors.agree ? 'true' : 'false'}
              aria-describedby={errors.agree ? 'agree-error' : undefined}
              {...register('agree')}
            />
            <label className={styles.checkboxLabel} htmlFor="agree">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {errors.agree && (
            <span id="agree-error" className={styles.errorText} role="alert" style={{ marginTop: '-1rem', marginBottom: '1rem', display: 'block' }}>
              {errors.agree.message}
            </span>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.button}
            disabled={isButtonDisabled}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? <div className={styles.spinner}></div> : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};