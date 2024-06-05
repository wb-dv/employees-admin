import {
  getAuthControllerAccountQueryKey,
  queryClient,
  useAuthControllerAccount,
} from '@shared/api';

export const useAccount = () => {
  const { data, ...query } = useAuthControllerAccount({
    query: {
      retry: (count) => count < 3,
    },
  });

  return { user: data, ...query };
};

export const invalidateAccount = () => {
  queryClient.invalidateQueries({
    queryKey: getAuthControllerAccountQueryKey(),
  });
};
