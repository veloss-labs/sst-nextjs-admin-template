import React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { useStore, createStore, StoreApi } from 'zustand';
import { Routes } from '~/libs/router/routes';

import type { NextRouter } from 'next/router';
import type { AuthoritiesSchema, RouteItem } from '~/libs/router/ts/route';

interface RouteSchema {
  originRoutes: AuthoritiesSchema[];
  menuRoutes: RouteItem[];
  selectedRoute?: string[];
  openRoutes?: string[];
}

export interface RouteStore extends RouteSchema {}

const getDefaultInitialState = () =>
  ({
    originRoutes: [],
    menuRoutes: [],
    openRoutes: [],
    selectedRoute: [],
  } as RouteSchema);

const RouteContext = createContext<StoreApi<RouteStore> | null>(null);

const createRouteStore = (
  initProps?: Partial<RouteSchema>,
  nextRouter?: NextRouter,
) => {
  const menuRoutes = Routes.makeClientRoutes(initProps?.originRoutes);
  const { selectedRoute, openRoutes } = Routes.getSelectedRoute(
    menuRoutes,
    nextRouter,
  );
  return createStore<RouteStore>()(() => ({
    ...getDefaultInitialState(),
    ...initProps,
    menuRoutes,
    selectedRoute,
    openRoutes,
  }));
};

interface Props extends Partial<RouteSchema> {
  children: React.ReactNode;
}

export default function RouteProvider({ children, ...otherProps }: Props) {
  const router = useRouter();
  const storeRef = useRef<StoreApi<RouteStore>>(null);
  if (!storeRef.current) {
    // @ts-ignore
    storeRef.current = createRouteStore(otherProps, router);
  }
  return (
    <RouteContext.Provider value={storeRef.current}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRouteContext<T>(
  selector: (state: RouteStore) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  const store = useContext(RouteContext);
  if (!store) {
    const error = new Error(
      'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    );
    error.name = 'ContextError';
    // @ts-ignore
    Error.captureStackTrace?.(error, useContext);
    throw error;
  }

  return useStore(store, selector, equalityFn);
}
