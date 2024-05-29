import { WorkerResponseDto, useAuthControllerLogin } from '@shared/api';
import { useToast } from '@shared/ui';

type UseLoginParams = {
  onSuccess?: (response: WorkerResponseDto) => void;
};

export const useLogin = ({ onSuccess }: UseLoginParams = {}) => {
  const { toast } = useToast();

  const { isPending, isError, error, mutate } = useAuthControllerLogin({
    mutation: {
      onSuccess,
      onError: (error) => {
        toast({
          title: 'Ошибка',
          description: error.response?.data.message || 'Не удалось войти',
          variant: 'destructive',
        });
      },
    },
  });

  return { login: mutate, isPending, isError, error };
};
