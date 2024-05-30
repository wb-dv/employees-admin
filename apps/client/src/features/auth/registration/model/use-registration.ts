import { useNavigate } from 'react-router-dom';

import { useAuthControllerRegister } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui';

export const useRegistration = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const { mutate, isPending } = useAuthControllerRegister({
    mutation: {
      onError: (error) => {
        toast({
          title: 'Ошибка',
          description:
            error.response?.data.message || 'Не удалось зарегистрироваться',
          variant: 'destructive',
        });
      },
      onSuccess: () => {
        navigate(routes.index);
      },
    },
  });

  return {
    register: mutate,
    isPending,
  };
};
