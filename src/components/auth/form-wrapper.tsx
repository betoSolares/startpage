import Link from 'next/link';
import React from 'react';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface FormWrapperProps {
  title: string;
  description: string;
  footerText: string;
  footerActionText: string;
  footerDestination: string;
  children: React.ReactNode;
}

export function FormWrapper({
  title,
  description,
  footerText,
  footerActionText,
  footerDestination,
  children,
}: FormWrapperProps) {
  return (
    <Card className='w-full min-w-min max-w-sm'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-xs leading-7 text-muted-foreground [&:not(:first-child)]:mt-6'>
            {footerText}
          </p>
          <Button variant='link' className='px-0' asChild>
            <Link href={footerDestination}>
              <p className='text-xs'>{footerActionText}</p>
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
