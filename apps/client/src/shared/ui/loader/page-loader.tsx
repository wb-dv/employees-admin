import { Loader } from './loader';

export const PageLoader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-teal-50">
      <Loader size={'2xl'} />
    </div>
  );
};
