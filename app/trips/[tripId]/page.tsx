import { auth } from '@/auth';
import TripDetailsClient from '@/components/TripDetailsClient';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

const TripDetails = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;
  const session = await auth();

  if (!session) {
    notFound();
  }

  const trip = await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: session.user?.id,
    },
    include: {
      locations: true,
    },
  });
  if (!trip) {
    notFound();
  }

  return <TripDetailsClient trip={trip} />;
};

export default TripDetails;
