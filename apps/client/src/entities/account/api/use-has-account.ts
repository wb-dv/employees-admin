import { useAuthControllerHasAccount } from '@shared/api';

type UseHasAccountParams = Parameters<typeof useAuthControllerHasAccount>[0];

export const useHasAccount = (params: UseHasAccountParams) => {
  const { data, mutate } = useAuthControllerHasAccount(params);

  return { hasAccount: data?.existed, checkHasAccount: mutate };
};
