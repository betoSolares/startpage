import { Skeleton } from '../_components/ui/skeleton';

export default function LoadingPage() {
  return (
    <div className='p-8'>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-4'>
        <div className='flex w-44 flex-col items-center gap-2'>
          <Skeleton className='h-40 w-full rounded-lg' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
        <div className='flex w-44 flex-col items-center gap-2'>
          <Skeleton className='h-40 w-full rounded-lg' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
        <div className='flex w-44 flex-col items-center gap-2'>
          <Skeleton className='h-40 w-full rounded-lg' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
        <div className='flex w-44 flex-col items-center gap-2'>
          <Skeleton className='h-40 w-full rounded-lg' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
        <div className='flex w-44 flex-col items-center gap-2'>
          <Skeleton className='h-40 w-full rounded-lg' />
          <Skeleton className='h-6 w-16 rounded-full' />
        </div>
      </div>
    </div>
  );
}
