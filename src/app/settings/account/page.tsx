import { Button } from '@/app/_components/ui/button';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();

  return (
    <div className='space-y-6'>
      <section className='flex flex-col gap-4'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Account Details
        </h3>
        <div className='divide-bg-border grid grid-flow-row divide-y'>
          <section className='flex flex-row items-start justify-between gap-4 py-2'>
            <div className='flex flex-grow flex-col'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                Email address
              </h4>
              <p className='leading-7 text-muted-foreground'>
                {session?.user.email}
              </p>
            </div>
            <Button variant='link' size='lg' className='text-foreground'>
              <p className='font-semibold'>Edit</p>
            </Button>
          </section>
          <section className='flex flex-row items-start justify-between gap-4 py-2'>
            <div className='flex flex-grow flex-col'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                Password
              </h4>
              <p className='leading-7 text-muted-foreground'>••••••••••••</p>
            </div>
            <Button variant='link' size='lg' className='text-foreground'>
              <p className='font-semibold'>Edit</p>
            </Button>
          </section>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Manage Account
        </h3>
        <div className='divide-bg-border grid grid-flow-row divide-y'>
          <section className='flex flex-row items-start justify-between gap-4 py-2'>
            <div className='flex flex-grow flex-col'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                Delete Account
              </h4>
              <p className='leading-7 text-muted-foreground'>
                Permanently delete your account.
              </p>
            </div>
            <Button variant='link' size='lg' className='text-destructive'>
              <p className='font-semibold'>Delete</p>
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}
