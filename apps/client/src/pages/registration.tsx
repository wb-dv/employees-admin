import { Link } from 'react-router-dom';

import { RegistrationForm } from '@features/auth/registration';

import { routes } from '@shared/config/router';
import { Card, CardContent, CardFooter, CardHeader } from '@shared/ui/card';

export const RegistrationPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-teal-50">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <h1 className="text-3xl text-center">Employees Admin: Регистрация</h1>
        </CardHeader>

        <CardContent>
          <RegistrationForm />
        </CardContent>

        <CardFooter>
          Уже есть аккаунт?{' '}
          <Link
            className="pl-1 hover:text-teal-600 transition-colors font-bold"
            to={routes.login}
          >
            Вход
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
