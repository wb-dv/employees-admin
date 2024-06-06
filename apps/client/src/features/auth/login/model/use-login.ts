import { useNavigate } from 'react-router-dom';

import { useAuthControllerLogin } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui/toaster';

export const useLogin = () => {
  const { errorToast, toast } = useToast();

  const navigate = useNavigate();

  const { mutate, ...mutation } = useAuthControllerLogin({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Вход',
          description: 'Вы вошли в аккаунт',
          variant: 'success',
        });
        navigate(routes.main);
      },
      onError: (error) => {
        errorToast({
          message: error.response?.data.message || 'Не удалось войти',
        });
      },
    },
  });

  return { login: mutate, ...mutation };
};
