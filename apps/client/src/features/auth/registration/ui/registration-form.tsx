import { useHasAccount } from '@entities/account';

import { CheckRegistrationForm } from './check-registration-form';
import { ExistedRegistrationForm } from './existed-registration-form';
import { NewRegistrationForm } from './new-registration-form';

export const RegistrationForm = () => {
  const { hasAccount, lastCheckedEmail, checkHasAccount, isPending } =
    useHasAccount();

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
