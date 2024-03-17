import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { cn } from '@/lib/shadcn';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className='relative'>
        <Input
          className={cn('pr-10', className)}
          type={showPassword ? 'text' : 'password'}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => setShowPassword((prev) => !prev)}
          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon className='h-4 w-4' aria-hidden />
          ) : (
            <EyeOffIcon className='h-4 w-4' aria-hidden />
          )}
          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
