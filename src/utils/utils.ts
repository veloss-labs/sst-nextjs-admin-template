import { apiHost } from '~/constants/env';
import { isBrowser } from '~/libs/browser/dom';

import type { Nullable } from '~/ts/common';
import type { GetServerSidePropsContext, NextPageContext } from 'next';

type GetUrlParams = {
  ctx?: Nullable<GetServerSidePropsContext | NextPageContext>;
  nextApiRoutes?: boolean;
};

export const getUrl = (params?: GetUrlParams) => {
  const { ctx, nextApiRoutes } = params || {};
  const _NEXT_API_ROUTES_PATHNAME = '/api';
  const _NEXT_COMMON_PATHNAME = '/';
  const baseUrl = nextApiRoutes
    ? _NEXT_API_ROUTES_PATHNAME
    : _NEXT_COMMON_PATHNAME;

  if (!apiHost) {
    if (ctx && ctx.req) {
      const { headers } = ctx.req;
      const host = headers.host;
      const protocol = headers['x-forwarded-proto'] || 'http';
      return new URL(baseUrl, `${protocol}://${host}`);
    } else if (isBrowser) {
      return new URL(baseUrl, location.origin);
    }
  }

  // apiHost의 pathname을 split해서 baseUrl에 붙여준다.
  // ex) apiHost: https://api.example.com/api/v1
  //     baseUrl: https://api.example.com
  //     pathname: /api/v1
  return new URL(apiHost);
};
