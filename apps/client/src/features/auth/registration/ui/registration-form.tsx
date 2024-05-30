import { useHasAccount } from '@entities/account';

import { CheckRegistrationForm } from './check-registration-form';
import { ExistedRegistrationForm } from './existed-registration-form';
import { NewRegistrationForm } from './new-registration-form';

export const RegistrationForm = () => {
  const { hasAccount, lastCheckedEmail } = useHasAccount();

  if (!lastCheckedEmail) {
    return <CheckRegistrationForm />;
  }

  if (hasAccount) {
    return <ExistedRegistrationForm existedEmail={lastCheckedEmail} />;
  }

  return <NewRegistrationForm defaultEmail={lastCheckedEmail} />;
};
