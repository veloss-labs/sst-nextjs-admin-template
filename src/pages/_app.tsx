import '~/assets/css/globals.css';
import React from 'react';
import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';

import { Inter } from '@next/font/google';

import Provider from '~/store/provider';

// types
import type { NextPage } from 'next';
import type { AppContext, AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface AppPropsWithLayout
  extends AppProps,
    Pick<NextPage, 'getInitialProps'> {
  Component: NextPageWithLayout;
  isLoggedIn: boolean;
  currentProfile?: any;
}

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' });

export default function App({
  Component,
  pageProps,
  isLoggedIn,
  currentProfile,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#111111',
          colorLink: '#c4c4c4',
          colorLinkHover: '#e7e7e7',
        },
      }}
      locale={koKR}
    >
      <Provider
        pageProps={pageProps}
        isLoggedIn={isLoggedIn}
        currentProfile={currentProfile}
      >
        {getLayout(<Component {...pageProps} />)}
      </Provider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </ConfigProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  // 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
  pageProps = { ...pageProps };

  return {
    pageProps,
    isLoggedIn: false,
    currentProfile: null,
  };
};
