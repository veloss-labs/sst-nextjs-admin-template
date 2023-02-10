import React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';

interface RouteSchema {}

export interface RouteStore extends RouteSchema {}

const getDefaultInitialState = () => ({} as RouteSchema);

const RouteContext = createContext<StoreApi<RouteStore> | null>(null);

const createRouteStore = (initProps?: Partial<RouteSchema>) => {
  return createStore<RouteStore>()((set) => ({
    ...getDefaultInitialState(),
    ...initProps,
  }));
};

interface Props extends Partial<RouteSchema> {
  children: React.ReactNode;
}

export default function RouteProvider({ children, ...otherProps }: Props) {
  const storeRef = useRef<StoreApi<RouteStore>>(null);
  if (!storeRef.current) {
    // @ts-ignore
    storeRef.current = createRouteStore(otherProps);
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
