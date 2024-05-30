import { useNavigate } from 'react-router-dom';

import { useAuthControllerLogout } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui';

export const useLogout = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { mutate, isPending } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        navigate(routes.login);
      },
      onError: (error) => {
        toast({
          title: 'Ошибка',
          description: error.response?.data.message || 'Не удалось выйти',
          variant: 'destructive',
        });
      },
    },
  });

  return { logout: mutate, isPending };
};
