import { Settings } from 'lucide-react';
import Image from 'next/image';
import logo from 'public/img/logo.png';

import { ThemeToggler } from './theme-toggler';
import { Button } from './ui/button';

export function Header() {
  return (
    <nav className='sticky top-0 z-50 border-b border-border/40 bg-background'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Image src={logo} alt='Startpage logo' className='h-8 w-8' />
            </div>
            <div className='block'>
              <div className='ml-2 flex items-center space-x-4'>
                <h1 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                  Startpage
                </h1>
              </div>
            </div>
          </div>
          <div className='block'>
            <div className='ml-4 flex items-center gap-3 md:ml-6'>
              <Button variant='outline' size='icon'>
                <Settings className='h-6 w-6' />
                <span className='sr-only'>Settings</span>
              </Button>
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
