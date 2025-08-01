'use server';

import { auth } from '@/auth';
import { prisma } from '../prisma';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

async function getCodeAddress(address: string) {
  //   const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  //   const response = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${apiKey}`
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   const { lat, lng } = data.results[0].geometry.location;
  //   return { lat, lng };

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`,
    {
      headers: {
        'User-Agent': 'travel-planner/1.0 (anandosharma9@gmail.com)',
      },
    }
  );

  const data = await response.json();
  let { lat, lon: lng } = data[0];
  lat = parseFloat(lat);
  lng = parseFloat(lng);

  return { lat, lng };
}

export default async function addLocation(formData: FormData, tripId: string) {
  try {
    const session = await auth();
    if (!session) throw new Error('Unauthorized!');

    const address = formData.get('address')?.toString();
    if (!address) throw new Error('Missing Address');
    await getCodeAddress(address);
    const { lat, lng } = await getCodeAddress(address);
    const countTrips = await prisma.location.count({
      where: {
        tripId,
      },
    });

    await prisma.location.create({
      data: {
        locationTitle: address,
        lat,
        lng,
        tripId,
        order: countTrips,
      },
    });

    redirect(`/trips/${tripId}`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log('Error in addLocation', error);
  }
}
