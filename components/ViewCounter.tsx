import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
// import { writeClient } from '@/sanity/lib/write-client';
import { incrementViews } from './actions';
// import { after } from 'next/server';
export const ViewCounter = async ({ id }: { id: string }) => {
  const {views:totalViews} = await client
    .withConfig({useCdn:false})
        .fetch(STARTUP_VIEWS_QUERY, { id });

  // after(async() => {
  //   await writeClient.patch(id).set({views: totalViews + 1}).commit();
  // });
  await incrementViews(id, totalViews);

  return (
    <div className='view-counter'>
      <span className='text-sm text-gray-500'>Views: {totalViews}</span>
    </div>
  );
};
