import { ApiService } from '~/api/client';
import { routesMiddleware } from '~/api/services/middleware/routeMiddleware';

import type { BaseApiOptions } from '~/api/ts/schema';

export const getBaseHelloApi = async (options?: BaseApiOptions['ky']) => {
  const resp = await ApiService.getJson<{ name: string }>(
    ApiService._API_ROUTES.hello,
    options,
  );
  return resp.name;
};

export const getHelloApi = (options?: BaseApiOptions) => {
  const opts = routesMiddleware(
    Object.assign({}, options, { canOverride: true }),
  );
  return getBaseHelloApi(opts);
};
