import { useNavigate } from 'react-router-dom';

import { useAuthControllerLogout } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui/toaster';

export const useLogout = () => {
  const navigate = useNavigate();

  const { errorToast, toast } = useToast();

  const { mutate, isPending } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        toast({
          title: 'Выход',
          description: 'Вы вышли из аккаунта',
          variant: 'success',
        });
        navigate(routes.main);
      },
      onError: (error) => {
        errorToast({
          message: error.response?.data.message || 'Не удалось выйти',
        });
      },
    },
  });

  return { logout: mutate, isPending };
};
