import { useQuery } from '@tanstack/react-query';
import { getHelloApi } from '~/api/services/app/mock';
import type { BaseApiOptions } from '~/api/ts/schema';
import type { UseQueryOptions, QueryFunction } from '@tanstack/react-query';

type QueryOptions = Omit<
  UseQueryOptions<string, unknown, string, string[]>,
  'initialData' | 'queryFn' | 'queryKey'
> & {
  initialData?: any;
};

interface UseBaseQuery extends QueryOptions {
  apiOptions?: BaseApiOptions;
}

export const useHelloQuery = (options?: UseBaseQuery) => {
  const { apiOptions, ...queryOpts } = options || {};

  const loader: QueryFunction<string, string[]> = async (key) => {
    const opts = Object.assign({}, apiOptions, { key });
    return getHelloApi(opts);
  };

  const baseOptions = Object.assign({}, queryOpts, {});

  return useQuery([getHelloApi.name], loader, baseOptions);
};
