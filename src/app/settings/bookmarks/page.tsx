import { Button } from '@/app/_components/ui/button';

export default async function Page() {
  return (
    <div className='space-y-6'>
      <section className='flex flex-col gap-4'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
          Manage Bookmarks
        </h3>
        <div className='divide-bg-border grid grid-flow-row divide-y'>
          <section className='flex flex-row items-start justify-between gap-4 py-2'>
            <div className='flex flex-grow flex-col'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                Import Bookmarks
              </h4>
              <p className='leading-7 text-muted-foreground'>
                Bring your bookmarks from other places.
              </p>
            </div>
            <Button variant='link' size='lg' className='text-foreground'>
              <p className='font-semibold'>Import</p>
            </Button>
          </section>
          <section className='flex flex-row items-start justify-between gap-4 py-2'>
            <div className='flex flex-grow flex-col'>
              <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
                Export Bookmarks
              </h4>
              <p className='leading-7 text-muted-foreground'>
                Get a copy of your bookmarks.
              </p>
            </div>
            <Button variant='link' size='lg' className='text-foreground'>
              <p className='font-semibold'>Export</p>
            </Button>
          </section>
        </div>
      </section>
    </div>
  );
}
