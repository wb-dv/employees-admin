import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <main className="flex w-screen h-screen">
      <aside className="w-64 h-full"></aside>

      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
};
