import { useAuthControllerAccount } from '@shared/api';

export const useAccount = () => {
  const { data, error, isError, isLoading, isPending } =
    useAuthControllerAccount({
      query: {
        retry: (count) => count < 3,
      },
    });

  return { user: data, error, isError, isLoading, isPending };
};
