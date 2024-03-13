import { VariantProps, cva } from 'class-variance-authority';
import { CheckCircle, XCircle } from 'lucide-react';

import { cn } from '@/lib/shadcn';

const formMessageVariants = cva(
  'flex items-center gap-x-2 border-l-2 bg-transparent p-3 text-sm',
  {
    variants: {
      type: {
        sucess: 'border-emerald-500 text-emerald-500',
        error: 'border-destructive text-destructive',
      },
    },
    defaultVariants: {
      type: 'sucess',
    },
  }
);

interface FormMessageProps extends VariantProps<typeof formMessageVariants> {
  message?: string;
}

export function FormMessage({ message, type }: FormMessageProps) {
  if (!message) return null;

  return (
    <div className={cn(formMessageVariants({ type }))}>
      {type === 'error' ? (
        <XCircle className='h-4 w-4' />
      ) : (
        <CheckCircle className='h-4 w-4' />
      )}
      <p>{message}</p>
    </div>
  );
}
