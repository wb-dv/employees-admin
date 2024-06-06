import { Link, useNavigate } from 'react-router-dom';

import { routes } from '@shared/config/router';
import { Button } from '@shared/ui/button';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-red-300 gap-6 text-red-950">
      <h1 className="text-3xl">Ошибка</h1>
      <p className="text-xl">Страница не найдена или что-то пошло не так</p>
      <div className=" flex flex-col gap-4 items-center">
        <Button className="w-full" size={'lg'} asChild>
          <Link to={routes.main}>На главную</Link>
        </Button>

        <Button
          className="w-full"
          onClick={() => navigate(-1)}
          variant={'secondary'}
          size={'lg'}
        >
          Вернуться назад
        </Button>
      </div>
    </div>
  );
};
