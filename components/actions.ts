
'use server';

import { writeClient } from '@/sanity/lib/write-client';

export async function incrementViews(id: string, currentViews: number) {
  try {
    await writeClient.patch(id).set({ views: currentViews + 1 }).commit();
  } catch (error) {
    console.error('Failed to increment views:', error);
  }
}
