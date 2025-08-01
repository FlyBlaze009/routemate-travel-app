'use client';

import { useTransition } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import addLocation from '@/lib/actions/add-location';

const NewLocationClient = ({ tripId }: { tripId: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Add New Location
          </h1>
          <form
            action={(formData: FormData) => {
              startTransition(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <div>
              <Input
                placeholder="eg. Statue of Liberty"
                className="shadow-sm border-1 py-6"
                name="address"
              />
            </div>
            <Button className="w-full mt-6">
              {isPending ? 'Adding...' : 'Add Location'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLocationClient;
