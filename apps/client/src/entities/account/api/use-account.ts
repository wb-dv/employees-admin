import { useAuthControllerAccount } from '@shared/api';

export const useAccount = () => {
  const { data, error, isError, isLoading, isPending } =
    useAuthControllerAccount();

  return { account: data, error, isError, isLoading, isPending };
};
