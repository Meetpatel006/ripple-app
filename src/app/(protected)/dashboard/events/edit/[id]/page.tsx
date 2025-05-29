"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EventForm, { EventFormValues } from '@/components/events/EventForm';
import { ChevronLeft } from 'lucide-react';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<EventFormValues>>({});

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      const res = await fetch(`/api/events/${id}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const event = await res.json();
      let date = '', time = '';
      if (event.datetime) {
        const dt = new Date(event.datetime);
        date = dt.toISOString().slice(0, 10);
        time = dt.toISOString().slice(11, 16);
      }
      setInitialValues({
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        date,
        time,
        capacity: event.capacity ? String(event.capacity) : '',
        isPublic: event.isPublic ?? true,
        selectedImage: event.thumbnail || null,
      });
      setLoading(false);
    }
    if (id) fetchEvent();
  }, [id]);

  const handleEdit = async (values: EventFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          location: values.location,
          datetime: `${values.date}T${values.time}`,
          capacity: values.capacity ? parseInt(values.capacity) : undefined,
          isPublic: values.isPublic,
          thumbnail: values.thumbnail,
        }),
      });
      if (!res.ok) throw new Error('Failed to update event');
      router.push('/dashboard/events');
    } catch (error) {
      alert('Failed to update event');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Event</h1>
            <p className="text-gray-400 mt-1">Update your event details</p>
            <nav className="flex items-center text-sm text-gray-400 mt-2">
              <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span onClick={() => router.push('/dashboard/events')} className="hover:text-white transition-colors cursor-pointer">Events</span>
              <span className="mx-2">/</span>
              <span className="text-white">Edit Event</span>
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
        initialValues={initialValues}
        onSubmit={handleEdit}
        isSubmitting={isSubmitting}
        submitLabel={isSubmitting ? 'Updating...' : 'Update Event'}
      />
    </div>
  );
} 