import Link from 'next/link';
import React from 'react';
import Square3Stack3DIcon from '@heroicons/react/24/outline/Square3Stack3DIcon';
import AuthLayout from '~/components/auth/AuthLayout';
import LoginForm from '~/components/auth/LoginForm';

export default function SignInPage() {
  return (
    <>
      <div className="auth-form">
        <div>
          <Square3Stack3DIcon className="mx-auto h-6 w-6" />
          <h1 className="title">Welcome back</h1>
          <p className="description">
            Enter your email to sign in to your account
          </p>
        </div>
        <LoginForm />
        <p className="footer">
          <Link href="/auth/signup">Don&apos;t have an account? Sign Up</Link>
        </p>
      </div>
    </>
  );
}

SignInPage.getLayout = function GetLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
