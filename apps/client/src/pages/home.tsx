import { LogoutButton } from '@features/auth/logout';

export const Home = () => {
  return (
    <div className="flex items-center gap-6">
      <h1>Home</h1>

      <LogoutButton />
    </div>
  );
};
