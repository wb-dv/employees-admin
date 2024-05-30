import { useNavigate } from 'react-router-dom';

import { useAuthControllerLogin } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui';

export const useLogin = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { mutate, ...mutation } = useAuthControllerLogin({
    mutation: {
      onSuccess: () => {
        navigate(routes.index);
      },
      onError: (error) => {
        toast({
          title: 'Ошибка',
          description: error.response?.data.message || 'Не удалось войти',
          variant: 'destructive',
        });
      },
    },
  });

  return { login: mutate, ...mutation };
};
