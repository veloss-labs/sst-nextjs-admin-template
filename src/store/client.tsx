import React from 'react';
import DefaultSeo from '~/components/shared/seo/DefaultSeo';
import AuthProvider, { type AuthStore } from './useAuthStore';
import RouteProvider, { type RouteStore } from './useRouteStore';
import LayoutProvider from './useLayoutStore';

export interface ClientProps
  extends Pick<AuthStore, 'isLoggedIn' | 'currentProfile'>,
    Pick<RouteStore, 'originRoutes'> {
  children: React.ReactNode;
}

export default function Client({ children, ...otherProps }: ClientProps) {
  const authStore: Pick<AuthStore, 'isLoggedIn' | 'currentProfile'> = {
    isLoggedIn: otherProps.isLoggedIn ?? false,
    currentProfile: otherProps.currentProfile ?? null,
  };

  const routesStore: Pick<RouteStore, 'originRoutes'> = {
    originRoutes: otherProps.originRoutes ?? [],
  };

  return (
    <>
      <DefaultSeo />
      <AuthProvider {...authStore}>
        <LayoutProvider>
          <RouteProvider {...routesStore}>{children}</RouteProvider>
        </LayoutProvider>
      </AuthProvider>
    </>
  );
}
