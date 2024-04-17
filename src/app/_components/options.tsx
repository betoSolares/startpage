'use client';

import { LogOut, Moon, MoreVertical, Settings, Sun } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Options() {
  const session = useSession();

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const switchTheme = () => {
    if (currentTheme == 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <MoreVertical className='h-4 w-4' />
          <span className='sr-only'>Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {session.status === 'authenticated' && (
            <DropdownMenuItem asChild>
              <Link href='/settings'>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={switchTheme}>
            <Sun className='mr-2 h-4 w-4 dark:hidden' />
            <Moon className='mr-2 hidden h-4 w-4 dark:inline' />
            <span>Switch theme</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {session.status === 'authenticated' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
