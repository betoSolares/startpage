'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/shadcn';

import { buttonVariants } from '../ui/button';

interface SidebarProps {
  items: {
    href: string;
    title: string;
  }[];
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();
  return (
    <nav className='flex space-x-4 lg:flex-col lg:space-x-0 lg:space-y-2'>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
