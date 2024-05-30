import { ErrorDto } from '@shared/api';

export type UseRegistrationParams<Data = void> = {
  onSuccess?: (data: Data) => void;
  onError?: (error?: ErrorDto) => void;
};

export type RegistrationFormParams<Data = void> = {
  onSubmit?: (data: Data) => void;
  onSuccess?: () => void;
  onError?: (error?: ErrorDto) => void;
};
