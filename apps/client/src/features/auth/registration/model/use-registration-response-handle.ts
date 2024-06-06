import { useNavigate } from 'react-router-dom';

import { ErrorDto } from '@shared/api';
import { routes } from '@shared/config/router';
import { useToast } from '@shared/ui/toaster';

export const useRegistrationResponseHandle = () => {
  const navigate = useNavigate();

  const { toast, errorToast } = useToast();

  return {
    onSuccess: () => {
      toast({
        title: 'Регистрация',
        description: 'Вы успешно зарегистрировались',
        variant: 'success',
      });
      navigate(routes.main);
    },
    onError: (error: { response?: { data: ErrorDto } }) => {
      errorToast({
        message:
          error.response?.data.message || 'Не удалось зарегистрироваться',
      });
    },
  };
};
