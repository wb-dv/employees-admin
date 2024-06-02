import { Link } from 'react-router-dom';

import { LoginForm } from '@features/auth/login';

import { routes } from '@shared/config/router';
import { Card, CardContent, CardFooter, CardHeader } from '@shared/ui/card';

export const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-teal-50">
      <Card>
        <CardHeader>
          <h1 className="text-3xl text-center">Employees Admin: Вход</h1>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter>
          Нет аккаунта?{' '}
          <Link
            className="pl-1 hover:text-teal-600 transition-colors font-bold"
            to={routes.register}
          >
            Зарегистрироваться
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
