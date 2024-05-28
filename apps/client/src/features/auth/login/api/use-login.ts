import { useAuthControllerLogin } from '@shared/api';

export const useLogin = () => {
  const { isPending, isError, error, mutate } = useAuthControllerLogin();

  return { login: mutate, isPending, isError, error };
};
