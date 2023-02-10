import Link from 'next/link';
import React from 'react';
import ArrowLeftIcon from '@heroicons/react/20/solid/ArrowLeftIcon';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="auth-layout">
        <div className="auth-container">
          <Link href="/" className="btn-link--back">
            <ArrowLeftIcon className="mr-2 icon--sm" />
            Back
          </Link>
          {children}
        </div>
      </div>
      <style jsx>{`
        .icon--logo {
          height: 21px;
          width: 130px;
          min-width: 24px;
          cursor: pointer;
          margin-left: 20px;
        }

        @media screen and (min-width: 768px) {
          .icon--logo {
            margin-left: 0px;
          }
        }
      `}</style>
    </>
  );
}

export default AuthLayout;
