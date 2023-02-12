import React from 'react';
import AuthLayout from '~/components/auth/AuthLayout';
import LoginForm from '~/components/auth/LoginForm';
import AuthForm from '~/components/auth/AuthForm';

export default function SignInPage() {
  return (
    <AuthForm
      title="Welcome back"
      description="계정에 로그인하려면 이메일, 비밀번호를 입력하세요."
      isSignup
    >
      <LoginForm />
    </AuthForm>
  );
}

SignInPage.getLayout = function GetLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
