import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import '@/app/_styles/globals.css';
import { cn } from '@/lib/shadcn';

import { Header } from './_components/header';
import { ThemeProvider } from './_components/theme-provider';
import { TRPCProvider } from './_components/trpc-provider';

export const metadata: Metadata = {
  title: 'Startpage',
  description: 'Simple homepage for your browser',
  icons: {
    icon: '/favicon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen min-w-full font-sans',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <TRPCProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className='container'>
              <div className='min-h-screen pt-16'>{children}</div>
            </main>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
