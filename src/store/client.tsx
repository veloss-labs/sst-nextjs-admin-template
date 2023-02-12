import React from 'react';
import DefaultSeo from '~/components/shared/seo/DefaultSeo';
import AuthProvider, { type AuthStore } from './useAuthStore';
import RouteProvider, { type RouteStore } from './useRouteStore';
import LayoutProvider, { type LayoutStore } from './useLayoutStore';

export interface ClientProps
  extends Pick<AuthStore, 'isLoggedIn' | 'currentProfile'> {
  children: React.ReactNode;
}

export default function Client({ children, ...otherProps }: ClientProps) {
  const authStore: Pick<AuthStore, 'isLoggedIn' | 'currentProfile'> = {
    ...(otherProps ?? {
      isLoggedIn: false,
      currentProfile: null,
    }),
  };

  return (
    <>
      <DefaultSeo />
      <AuthProvider {...authStore}>
        <LayoutProvider>
          <RouteProvider>{children}</RouteProvider>
        </LayoutProvider>
      </AuthProvider>
    </>
  );
}
