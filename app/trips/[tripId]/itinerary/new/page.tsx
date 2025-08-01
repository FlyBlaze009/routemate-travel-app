import NewLocationClient from '@/components/NewLocationClient';
import React from 'react';

const NewLocation = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;
  return <NewLocationClient tripId={tripId} />;
};

export default NewLocation;
