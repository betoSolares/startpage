import { Separator } from '@/app/_components/ui/separator';
import { auth } from '@/lib/auth';

export default async function Page() {
  const session = await auth();

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Account
        </h3>
        <p className='text-sm text-muted-foreground'>
          Update your account settings.
        </p>
      </div>
      <Separator />
      <div className='flex flex-col gap-12'>
        <section>
          <h4 className='mb-4 scroll-m-20 text-xl font-semibold tracking-tight'>
            Account Details
          </h4>
          <div className='flex flex-col gap-2'>
            <section>
              <p className='font-semibold'>Email address</p>
              <p className='text-sm text-muted-foreground'>
                {session?.user.email}
              </p>
            </section>
            <section>
              <p className='font-semibold'>Password</p>
              <p className='text-sm text-muted-foreground'>***********</p>
            </section>
          </div>
        </section>
        <section>
          <h4 className='mb-4 scroll-m-20 text-xl font-semibold tracking-tight'>
            Manage Account
          </h4>
          <div className='flex flex-col gap-2'>
            <section>
              <p className='font-semibold'>Delete account</p>
              <p className='text-sm text-muted-foreground'>
                Permanently delete your account.
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
