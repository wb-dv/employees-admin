import {
  getAuthControllerAccountQueryKey,
  queryClient,
  useAuthControllerAccount,
} from '@shared/api';

export const useAccount = () => {
  return useAuthControllerAccount({
    query: {
      retry: (count) => count < 3,
    },
  });
};

export const invalidateAccount = () => {
  queryClient.invalidateQueries({
    queryKey: getAuthControllerAccountQueryKey(),
  });
};
