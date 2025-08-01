import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react';

const TripsPage = async () => {
  const session = await auth();
  if (!session) {
    return (
      <div className=" flex justify-center items-center text-2xl font-bold h-screen">
        Sign-in to access your trips!
      </div>
    );
  }
  const trips = await prisma.trip.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href={'/trips/new'}>
          <Button className="cursor-pointer"> New Trip</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back! {session?.user?.name}</CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            {trips.length === 0
              ? 'You currently have no trips! Use the New Trip button to get started'
              : `You have ${trips.length} ${
                  trips.length === 1 ? 'trip' : 'trips'
                } logged. ${
                  upcomingTrips.length > 0
                    ? `${upcomingTrips.length} upcoming`
                    : 'No upcoming trips'
                }`}
          </p>
        </CardContent>
      </Card>

      {sortedTrips.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedTrips.slice(0, 6).map((trip, key) => (
            <Link key={key} href={`/trips/${trip.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{trip.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm line-clamp-2 mb-2">
                    {trip.description}
                  </p>
                  <div className="text-slate-700 text-sm">
                    {trip.startDate.toLocaleDateString()} -{' '}
                    {trip.endDate.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
