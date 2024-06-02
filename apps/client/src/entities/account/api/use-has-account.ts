import { useAuthControllerHasAccount } from '@shared/api';

type UseHasAccountParams = Parameters<typeof useAuthControllerHasAccount>[0];

export const useHasAccount = (params: UseHasAccountParams = {}) => {
  const { data, variables, mutate, ...mutation } =
    useAuthControllerHasAccount(params);

  return {
    hasAccount: data?.existed,
    lastCheckedEmail: variables?.data.email,
    checkHasAccount: mutate,
    ...mutation,
  };
};
