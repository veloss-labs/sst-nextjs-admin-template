import React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';

export const NAV_TYPE_SIDE = 'SIDE';
export const NAV_TYPE_TOP = 'TOP';
export const ROW_GUTTER = 16;
export const SIDE_NAV_WIDTH = 250;
export const SIDE_NAV_COLLAPSED_WIDTH = 80;

export type NavType = typeof NAV_TYPE_SIDE | typeof NAV_TYPE_TOP;

interface LayoutSchema {
  navCollapsed: boolean;
  mobileNav: boolean;
  navType: NavType;
}

export interface LayoutStore extends LayoutSchema {
  toggleNavCollapsed: (navCollapsed: boolean) => void;
  toggleMobileNav: (mobileNav: boolean) => void;
  navTypeChange: (navType: NavType) => void;
}

const getDefaultInitialState = () =>
  ({
    navCollapsed: false,
    mobileNav: false,
    navType: NAV_TYPE_SIDE,
  } as LayoutSchema);

const LayoutContext = createContext<StoreApi<LayoutStore> | null>(null);

const createLayoutStore = (initProps?: Partial<LayoutSchema>) => {
  return createStore<LayoutStore>()((set) => ({
    ...getDefaultInitialState(),
    ...initProps,
    toggleNavCollapsed: (navCollapsed: boolean) => set({ navCollapsed }),
    toggleMobileNav: (mobileNav: boolean) => set({ mobileNav }),
    navTypeChange: (navType: NavType) => set({ navType }),
  }));
};

interface Props extends Partial<LayoutSchema> {
  children: React.ReactNode;
}

export default function LayoutProvider({ children, ...otherProps }: Props) {
  const storeRef = useRef<StoreApi<LayoutStore>>(null);
  if (!storeRef.current) {
    // @ts-ignore
    storeRef.current = createLayoutStore(otherProps);
  }
  return (
    <LayoutContext.Provider value={storeRef.current}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext<T>(
  selector: (state: LayoutStore) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  const store = useContext(LayoutContext);
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
