import React from 'react';

import { Sidebar } from '../_components/settings/sidebar';
import { Separator } from '../_components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    title: 'Account',
    href: '/settings/account',
  },
  {
    title: 'Bookmarks',
    href: '/settings/bookmarks',
  },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='space-y-6 px-10 pb-16 pt-5 md:block'>
      <div className='space-y-0.5 '>
        <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0'>
          Settings
        </h2>
        <p className='text-muted-foreground'>
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator className='my-6' />
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <aside className='-mx-4 lg:w-1/5'>
          <Sidebar items={sidebarItems} />
        </aside>
        <div className='flex-1 lg:max-w-2xl'>{children}</div>
      </div>
    </div>
  );
}
