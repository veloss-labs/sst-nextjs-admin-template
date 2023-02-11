import Link from 'next/link';
import React from 'react';
import Square3Stack3DIcon from '@heroicons/react/24/outline/Square3Stack3DIcon';
import AuthLayout from '~/components/auth/AuthLayout';
import SignupForm from '~/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="auth-form">
      <div>
        <Square3Stack3DIcon className="mx-auto h-6 w-6" />
        <h1 className="title">Create an account</h1>
        <p className="description">
          계정을 만들려면 아래에 정보들을 입력하세요.
        </p>
      </div>
      <SignupForm />
      <p className="footer">
        <Link href="/auth/signin">이미 계정이 있으신가요?&nbsp;로그인</Link>
      </p>
    </div>
  );
}

SignupPage.getLayout = function GetLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
