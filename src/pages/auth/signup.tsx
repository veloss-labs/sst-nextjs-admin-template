import React from 'react';
import AuthForm from '~/components/auth/AuthForm';
import AuthLayout from '~/components/auth/AuthLayout';
import SignupForm from '~/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthForm
      title="Create an account"
      description="계정을 만들려면 아래에 정보들을 입력하세요."
      isSignup={false}
    >
      <SignupForm />
    </AuthForm>
  );
}

SignupPage.getLayout = function GetLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};
