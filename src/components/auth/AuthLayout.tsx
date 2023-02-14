import Link from 'next/link';
import React from 'react';
import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Link href="/" className="btn-link--back">
        <ArrowLeftIcon className="mr-2 icon--sm" />
        Back
      </Link>
      <div className="auth-layout">
        <div className="auth-container">{children}</div>
      </div>
    </>
  );
}

export default AuthLayout;
