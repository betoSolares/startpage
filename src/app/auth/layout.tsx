import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex h-[calc(100vh-4rem)] items-center justify-center'>
      {children}
    </div>
  );
}
