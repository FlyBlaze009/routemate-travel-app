'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createTrip } from '@/lib/actions/create-trip';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import { useState, useTransition } from 'react';

const NewTrip = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader className="text-center">New Trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append('imageUrl', imageUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div>
              <Label
                htmlFor="title"
                className="mb-1 text-gray text-sm font-medium"
              >
                Title
              </Label>
              <Input
                name="title"
                id="title"
                placeholder="Japan Trip..."
                required
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="mb-1 text-gray text-sm font-medium"
              >
                Description
              </Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Trip description..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="startDate"
                  className="mb-1 text-gray text-sm font-medium"
                >
                  Start Date
                </Label>
                <Input name="startDate" id="startDate" type="date" required />
              </div>
              <div>
                <Label
                  htmlFor="endDate"
                  className="mb-1 text-gray text-sm font-medium"
                >
                  End Date
                </Label>
                <Input name="endDate" id="endDate" type="date" required />
              </div>
            </div>

            <div>
              <Label>Trip Image</Label>
              {imageUrl && (
                <Image
                  alt="Trip Image Preview"
                  src={imageUrl}
                  width={200}
                  height={200}
                  className="w-full object-cover rounded-md my-4"
                />
              )}
              <UploadButton
                endpoint={'imageUploader'}
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating Trip' : 'Create Trip'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
