import React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore, createStore, StoreApi } from 'zustand';

interface LayoutSchema {
  isShowSidebar: boolean;
  isShowPopupMenu: boolean;
}

export interface LayoutStore extends LayoutSchema {
  closeSidebar: () => void;
  closePopupMenu: () => void;
  openSidebar: () => void;
  openPopupMenu: () => void;
  toggleSidebar: () => void;
  togglePopupMenu: () => void;
}

const getDefaultInitialState = () =>
  ({
    isShowSidebar: true,
    isShowPopupMenu: false,
  } as LayoutSchema);

const LayoutContext = createContext<StoreApi<LayoutStore> | null>(null);

const createLayoutStore = (initProps?: Partial<LayoutSchema>) => {
  return createStore<LayoutStore>()((set) => ({
    ...getDefaultInitialState(),
    ...initProps,
    closeSidebar: () => set({ isShowSidebar: false }),
    closePopupMenu: () => set({ isShowPopupMenu: false }),
    openSidebar: () => set({ isShowSidebar: true }),
    openPopupMenu: () => set({ isShowPopupMenu: true }),
    toggleSidebar: () =>
      set((state) => ({ isShowSidebar: !state.isShowSidebar })),
    togglePopupMenu: () =>
      set((state) => ({ isShowPopupMenu: !state.isShowPopupMenu })),
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

export function useLayoutContext(
  selector: (state: LayoutStore) => LayoutStore,
  equalityFn?: (left: LayoutStore, right: LayoutStore) => boolean,
): LayoutStore {
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
