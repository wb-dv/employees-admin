import { UseFormReturn } from 'react-hook-form';

import { SearchWorkersSchema } from '../model';

export type SearchSubFormFormProps = {
  searchForm: UseFormReturn<SearchWorkersSchema>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onReset: () => void;
  className?: string;
};
