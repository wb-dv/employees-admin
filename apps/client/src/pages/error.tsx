import { routes } from '@shared/config/router';
import { Button } from '@shared/ui';
import { Link, useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-red-300 gap-6 text-red-950'>
      <h1 className='text-3xl'>Error</h1>
      <p className='text-xl'>Page not found or something went wrong</p>
      <div className='max-w-60 flex gap-4 items-center'>
        <Button onClick={() => navigate(-1)} variant={'secondary'} size={'lg'}>
          Go back
        </Button>
        <Button variant={'secondary'} size={'lg'} asChild>
          <Link to={routes.home}>Go home</Link>
        </Button>
      </div>
    </div>
  );
};
