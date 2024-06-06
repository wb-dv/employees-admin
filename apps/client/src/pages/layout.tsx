// import { Home } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { LogoutButton } from '@features/auth/logout';
import { NavItem, Navbar, useRolesNavigation } from '@features/navigation';

import { AccountShort } from '@entities/account';

// import { routes } from '@shared/config/router';

export const Layout = () => {
  const navItems = useRolesNavigation();

  return (
    <main className="flex flex-col w-screen h-screen p-4 gap-4 bg-teal-100">
      <header className="flex px-3 w-full bg-teal-500 rounded-md">
        <Navbar className="w-min">
          {/* <NavItem path={routes.index}>
            <Home />
          </NavItem> */}
          {navItems.map((item) => (
            <NavItem {...item} key={item.path} />
          ))}
        </Navbar>

        <AccountShort
          className="my-3 ml-auto max-w-80"
          right={<LogoutButton size={'sm'} variant={'ghost'} />}
        />
      </header>

      <div className="flex-1 bg-slate-50 rounded-md max-h-full overflow-auto">
        <Outlet />
      </div>
    </main>
  );
};
