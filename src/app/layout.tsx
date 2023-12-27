import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Startpage',
  description: 'Simple homepage for your browser',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang='en'>
      <body className='min-h-screen min-w-full bg-neutral-100 font-sans dark:bg-neutral-900 '>
        {children}
      </body>
    </html>
  );
}
