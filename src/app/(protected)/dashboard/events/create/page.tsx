"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft} from 'lucide-react';
import EventForm, { EventFormValues } from '@/components/events/EventForm';

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleCreate = async (values: EventFormValues) => {
    setIsSubmitting(true);
    try {
      // Only use the thumbnail URL from the form
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          location: values.location,
          datetime: `${values.date}T${values.time}`,
          capacity: values.capacity ? parseInt(values.capacity) : undefined,
          isPublic: values.isPublic,
          thumbnail: values.thumbnail,
          attendees: Math.floor(Math.random() * 91) + 10, // 10-100
        }),
      });
      if (!res.ok) throw new Error('Failed to create event');
      router.push('/dashboard/events');
    } catch (error) {
      alert('Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Create New Event</h1>
            <p className="text-gray-400 mt-1">Schedule a new event for your community</p>
            <nav className="flex items-center text-sm text-gray-400 mt-2">
              <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span onClick={() => router.push('/dashboard/events')} className="hover:text-white transition-colors cursor-pointer">Events</span>
              <span className="mx-2">/</span>
              <span className="text-white">Create Event</span>
            </nav>
          </div>
          <button
            onClick={() => router.push('/dashboard/events')}
            className="flex items-center gap-2 bg-[#23232A] hover:bg-[#2D2D35] text-gray-200 px-4 py-2 rounded-lg border border-[#2D2D35] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="text-sm">Back to Events</span>
          </button>
        </div>
      </div>
      <EventForm
        initialValues={{}}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
        submitLabel={isSubmitting ? 'Creating...' : 'Create Event'}
      />
    </div>
  );
}
