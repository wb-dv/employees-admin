import { useNavigate } from 'react-router-dom';

import { useAuthControllerRegister } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui';

export const useRegistration = () => {
  const { errorToast, toast } = useToast();

  const navigate = useNavigate();

  const { mutate, isPending } = useAuthControllerRegister({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Регистрация',
          description: 'Вы успешно зарегистрировались',
          variant: 'success',
        });
        navigate(routes.index);
      },
      onError: (error) => {
        errorToast({
          message:
            error.response?.data.message || 'Не удалось зарегистрироваться',
        });
      },
    },
  });

  return {
    register: mutate,
    isPending,
  };
};
