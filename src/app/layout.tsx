import type { Metadata } from 'next'
import "@/styles/globals.css"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


export const metadata: Metadata = {
  title: "Startpage",
  description: "Simple homepage for your browser",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
      <body className='font-sans bg-neutral-100 dark:bg-neutral-900 min-h-screen min-w-full'>
          {children}
      </body>
    </html>
  );
}
