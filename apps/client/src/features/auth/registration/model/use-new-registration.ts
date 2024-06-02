import { useAuthControllerRegister } from '@shared/api';

import { UseRegistrationParams } from './types';
import { useRegistrationResponseHandle } from './use-registration-response-handle';

export const useNewRegistration = ({
  onSuccess: onSuccessParam,
  onError: onErrorParam,
}: UseRegistrationParams = {}) => {
  const { onSuccess, onError } = useRegistrationResponseHandle();

  const { mutate, isPending } = useAuthControllerRegister({
    mutation: {
      onSuccess: () => {
        onSuccess();
        onSuccessParam?.();
      },
      onError: (error) => {
        onError(error);
        onErrorParam?.(error.response?.data);
      },
    },
  });

  return {
    register: mutate,
    isPending,
  };
};
