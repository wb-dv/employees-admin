import { LoginForm } from '@features/auth/login';

export const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/3 p-5 border rounded-lg flex flex-col gap-9 items-center">
        <h1 className="text-3xl text-center">Employees Admin: Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};
