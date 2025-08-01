'use client';
import { Location, Trip } from '@/app/generated/prisma';
import Image from 'next/image';
import { Calendar, MapPin, Plus } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import { TabsContent } from '@radix-ui/react-tabs';
import Map from './MapClientWrapper';
import SortableItinerary from './SortableItinerary';

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailsClientProps {
  trip: TripWithLocation;
}

const TripDetailsClient = ({ trip }: TripDetailsClientProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        </div>
      )}

      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>

          <div className="flex items-center text-gray-500 mt-2">
            <Calendar className="size-5 mr-2" />
            <span className="text-lg">
              {trip.startDate.toLocaleDateString()} -{' '}
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus />
              Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="size-6 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Dates</p>
                      <p className="text-sm text-gray-500">
                        {trip.startDate.toLocaleDateString()} -{' '}
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        {`${Math.round(
                          (trip.endDate.getTime() - trip.startDate.getTime()) /
                            (1000 * 60 * 60 * 24)
                        )} day(s)`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="size-6 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Destinations</p>
                      <p className="text-sm text-gray-500">
                        {trip.locations.length}{' '}
                        {trip.locations.length === 1 ? 'location' : 'locations'}
                      </p>
                    </div>
                  </div>

                  {trip.locations.length === 0 && (
                    <div>
                      <p className="text-md text-gray-800 font-semibold">
                        No locations added yet, click the Add Location button to
                        add new locations to your trip and see them on the Map!
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed mt-2">
                    {trip.description}
                  </p>
                </div>
              </div>
              <div className="h-72 rounded-lg overflow-hidden">
                <Map itineraries={trip.locations} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold"> Full Itinerary</h2>
            </div>

            {trip.locations.length === 0 ? (
              <div className="text-center p-4">
                <p>Add locations to see them on the itinerary.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {' '}
                    <Plus className="mr-2 h-5 w-5" /> Add Location
                  </Button>
                </Link>
              </div>
            ) : (
              <SortableItinerary locations={trip.locations} tripId={trip.id} />
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="">
              {trip.locations.length === 0 && (
                <div>
                  <p className="text-md text-gray-800 font-semibold">
                    No locations added yet, click the Add Location button to add
                    new locations to your trip and see them on the Map!
                  </p>
                </div>
              )}
              <div className="h-72 rounded-lg overflow-hidden">
                <Map itineraries={trip.locations} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-center">
        <Link href={`/trips`}>
          <Button className="w-1/8  shadow-md hover:cursor-pointer text-gray-300">
            Back to Trips
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TripDetailsClient;
