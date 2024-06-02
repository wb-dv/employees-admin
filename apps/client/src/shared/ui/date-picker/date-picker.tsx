import { format, formatISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { cn } from '@shared/utils';

import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import './date-picker.scss';

type DatePickerProps = {
  value?: string;
  onChange: (date: string | undefined) => void;
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const date = value && new Date(value);

  const clearDate: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    onChange(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal relative',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {date ? (
            format(date, 'P', { locale: ru })
          ) : (
            <span>Выберите дату</span>
          )}

          {date && (
            <div
              // variant={'ghost'}
              onClick={clearDate}
              className="absolute right-0 ml-auto h-full flex items-center justify-center p-0 px-3 hover:bg-red-200 transition-colors rounded"
            >
              <X className="size-4" />
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 overflow-hidden">
        <Calendar
          locale="ru-RU"
          onChange={(date) => {
            if (date && !Array.isArray(date)) {
              onChange(formatISO(date, { representation: 'date' }));
            }
          }}
          value={value ? new Date(value) : new Date()}
          maxDate={new Date()}
          minDate={new Date(1900, 0, 1)}
        />
      </PopoverContent>
    </Popover>
  );
};
