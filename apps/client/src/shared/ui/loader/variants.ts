import { cva } from 'class-variance-authority';

export const loaderVariants = cva('', {
  variants: {
    size: {
      default: 'size-12 before:size-12 after:size-12',
      sm: 'size-8 before:size-8 after:size-8',
      lg: 'size-16 before:size-16 after:size-16',
      xl: 'size-20 before:size-20 after:size-20',
      '2xl': 'size-28 before:size-28 after:size-28',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
