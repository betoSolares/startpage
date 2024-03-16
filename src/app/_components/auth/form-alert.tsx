import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/shadcn';

const formAlertVariants = cva(
  'flex items-center gap-x-2 border-l-2 bg-transparent p-3 text-sm',
  {
    variants: {
      type: {
        success: 'border-emerald-500 text-emerald-500',
        error: 'border-destructive text-destructive',
      },
    },
    defaultVariants: {
      type: 'success',
    },
  }
);

interface FormAlertProps extends VariantProps<typeof formAlertVariants> {
  message?: string;
}

export function FormAlert({ message, type }: FormAlertProps) {
  if (!message) return null;

  return (
    <div className={cn(formAlertVariants({ type }))}>
      <p>{message}</p>
    </div>
  );
}
