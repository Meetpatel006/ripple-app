import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, Image } from 'lucide-react';

export interface EventFormValues {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  capacity: string;
  isPublic: boolean;
  thumbnail: string;
}

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function EventForm({ initialValues = {}, onSubmit, isSubmitting, submitLabel }: EventFormProps) {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [location, setLocation] = useState(initialValues.location || '');
  const [date, setDate] = useState(initialValues.date || '');
  const [time, setTime] = useState(initialValues.time || '');
  const [capacity, setCapacity] = useState(initialValues.capacity || '');
  const [isPublic, setIsPublic] = useState(initialValues.isPublic ?? true);
  const [thumbnail, setThumbnail] = useState(initialValues.thumbnail || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title,
      description,
      location,
      date,
      time,
      capacity,
      isPublic,
      thumbnail,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Event Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-300">Event Title</Label>
            <Input id="title" placeholder="Enter event title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 bg-[#23232A] border-[#2D2D35] text-gray-200" />
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Textarea id="description" placeholder="Describe your event" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 min-h-[120px] bg-[#23232A] border-[#2D2D35] text-gray-200 resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-gray-300">Date</Label>
              <div className="relative mt-1">
                <Input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200" />
                <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="time" className="text-gray-300">Time</Label>
              <div className="relative mt-1">
                <Input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200" />
                <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="location" className="text-gray-300">Location</Label>
            <div className="relative mt-1">
              <Input id="location" placeholder="Enter event location" value={location} onChange={e => setLocation(e.target.value)} required className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200" />
              <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="capacity" className="text-gray-300">Capacity (optional)</Label>
            <div className="relative mt-1">
              <Input id="capacity" type="number" placeholder="Maximum number of attendees" value={capacity} onChange={e => setCapacity(e.target.value)} min="1" className="pl-10 bg-[#23232A] border-[#2D2D35] text-gray-200" />
              <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                <Users className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Event Image URL</h3>
        <Input
          id="thumbnail"
          placeholder="Paste an image URL (e.g. https://picsum.photos/seed/123/600/400)"
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
          className="mt-1 bg-[#23232A] border-[#2D2D35] text-gray-200"
        />
        {thumbnail && (
          <img src={thumbnail} alt="Event preview" className="mt-4 max-h-[200px] w-full object-contain rounded" />
        )}
      </div>
      <div className="bg-[#18181b] border border-[#23232A] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Event Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-300">Public Event</Label>
              <p className="text-xs text-gray-500">Anyone can view and RSVP</p>
            </div>
            <Switch checked={isPublic} onCheckedChange={setIsPublic} className="data-[state=checked]:bg-purple-600" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-300">Allow Guest +1</Label>
              <p className="text-xs text-gray-500">Attendees can bring a guest</p>
            </div>
            <Switch className="data-[state=checked]:bg-purple-600" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-gray-300">Send Reminders</Label>
              <p className="text-xs text-gray-500">24h before event starts</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting || !title || !description || !location || !date || !time} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl text-base font-medium">
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </Button>
    </form>
  );
} 