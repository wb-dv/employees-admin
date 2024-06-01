import { useHasAccount } from '@entities/account';

import { ErrorDto, ErrorType } from '@shared/api';
import { useToast } from '@shared/ui/toaster';

import { CheckRegistrationForm } from './check-registration-form';
import { ExistedRegistrationForm } from './existed-registration-form';
import { NewRegistrationForm } from './new-registration-form';

export const RegistrationForm = () => {
  const { toast, errorToast } = useToast();

  const { hasAccount, lastCheckedEmail, checkHasAccount, isPending } =
    useHasAccount({
      mutation: {
        onSuccess: (data) => {
          if (data.existed) {
            toast({
              title: 'Вас уже создали в системе, придумайте пароль',
              variant: 'success',
            });
          } else {
            toast({
              title:
                'Ваших данных ещё нет в системе, заполните информацию о себе и придумайте пароль',
              variant: 'success',
            });
          }
        },
        onError: (error) => {
          errorToast({
            message:
              (error as ErrorType<ErrorDto>).response?.data.message ||
              'Не удалось проверить аккаунт, попробуйте позже',
          });
        },
      },
    });

  if (!lastCheckedEmail) {
    return (
      <CheckRegistrationForm
        onSubmit={(data) => checkHasAccount({ data })}
        isPending={isPending}
      />
    );
  }

  if (hasAccount) {
    return <ExistedRegistrationForm existedEmail={lastCheckedEmail} />;
  }

  return <NewRegistrationForm defaultEmail={lastCheckedEmail} />;
};
