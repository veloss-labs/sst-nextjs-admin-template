import React from 'react';
import Link from 'next/link';
import Square3Stack3DIcon from '@heroicons/react/24/outline/Square3Stack3DIcon';

interface AuthFormProps {
  title: string;
  description: string;
  isSignup?: boolean;
  children: React.ReactNode;
}

function AuthForm({ title, description, isSignup, children }: AuthFormProps) {
  return (
    <div className="auth-form">
      <div>
        <Square3Stack3DIcon className="mx-auto h-6 w-6" />
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
      </div>
      {children}
      <p className="footer">
        <Link href={isSignup ? '/auth/signup' : '/auth/signin'}>
          {isSignup
            ? '계정이 없으신가요? 회원가입'
            : '이미 계정이 있으신가요? 로그인'}
        </Link>
      </p>
    </div>
  );
}

export default AuthForm;
