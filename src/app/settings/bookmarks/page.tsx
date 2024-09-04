import { Separator } from '@/app/_components/ui/separator';

export default async function Page() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Bookmarks
        </h3>
        <p className='text-sm text-muted-foreground'>
          Manage your bookmarks collection.
        </p>
      </div>
      <Separator />
      <div className='flex flex-col gap-12'>
        <section>
          <h4 className='mb-4 scroll-m-20 text-xl font-semibold tracking-tight'>
            Manage Bookmarks
          </h4>
          <div className='flex flex-col gap-2'>
            <section>
              <p className='font-semibold'>Import</p>
              <p className='text-sm text-muted-foreground'>
                Bring your bookmarks.
              </p>
            </section>
            <section>
              <p className='font-semibold'>Export</p>
              <p className='text-sm text-muted-foreground'>
                Get a copy of your bookmarks.
              </p>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
