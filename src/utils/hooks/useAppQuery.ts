import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';

import { ApiErrors } from '../configs/apiErrors';
import { useHandleApiError } from './useHandleApiError';

export type UseAppQueryResult<Response> = UseQueryResult<Response, ApiErrors>;

export function useAppQuery<Key extends QueryKey = QueryKey, Response = unknown, SelectData = Response>(
  options: UseQueryOptions<Response, ApiErrors, SelectData, Key>,
): UseAppQueryResult<SelectData> {
  const { handleApiError } = useHandleApiError();

  const result = useQuery<Response, ApiErrors, SelectData, Key>({
    retry: false,
    staleTime: Infinity,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    ...options,
  });

  // Considering
  if (result.error) {
    handleApiError(result.error);
  }

  return result;
}
