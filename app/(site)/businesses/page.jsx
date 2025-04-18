'use client';

import { Suspense } from 'react';
import BusinessesPage from '@/components/Businesses/index';
export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <BusinessesPage />
    </Suspense>
  );
}
