"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Users, ExternalLink, Share2, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface Event {
  id?: number;
  _id?: string;
  title: string;
  location: string;
  datetime: string;
  description: string;
  attendees?: number;
  host?: string;
  thumbnail?: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [rsvp, setRsvp] = useState(false);
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleRSVP = () => setRsvp(!rsvp);

  const handleEdit = () => {
    router.push(`/dashboard/events/edit/${event._id || event.id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeleting(true);
    try {
      await fetch(`/api/events/${event._id || event.id}`, { method: 'DELETE' });
      window.location.reload(); // Or trigger a state update in parent
    } catch (err) {
      alert('Failed to delete event');
    } finally {
      setDeleting(false);
    }
  };

  const eventDate = new Date(event.datetime);
  const isPastEvent = eventDate < new Date();
  
  // Format date nicely
  const formattedDate = format(eventDate, 'MMM dd, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <div className="bg-[#18181b] border border-[#23232A] rounded-xl overflow-hidden hover:border-[#3D3D45] transition-all duration-200 flex flex-col h-full relative">
      {/* Three-dot menu in the top right of the card, always visible */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-1.5 rounded-full hover:bg-[#23232A] text-gray-400 hover:text-gray-200 focus:outline-none shadow-lg bg-[#18181b]"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-[#23232A] border border-[#3D3D45] rounded-lg shadow-lg py-1 flex flex-col">
            <button
              onClick={() => { setMenuOpen(false); handleEdit(); }}
              className="px-4 py-2 text-left text-sm text-blue-500 hover:bg-[#18181b] hover:text-blue-600 rounded-t-lg"
            >
              Edit
            </button>
            <button
              onClick={() => { setMenuOpen(false); handleDelete(); }}
              disabled={deleting}
              className="px-4 py-2 text-left text-sm text-red-500 hover:bg-[#18181b] hover:text-red-600 rounded-b-lg"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>
      {/* Event Image */}
      {event.thumbnail && (
        <div className="relative w-full h-32">
          <img 
            src={event.thumbnail} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-white">{event.title}</h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span>{formattedTime}</span>
          <span className="mx-1">•</span>
          <MapPin className="h-3.5 w-3.5" />
          <span>{event.location}</span>
        </div>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{event.description}</p>
        {/* Date below description */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        {event.host && (
          <div className="flex items-center mt-2 mb-3">
            <div className="h-5 w-5 rounded-full bg-[#2D2D35] flex items-center justify-center text-xs text-gray-300 mr-2">
              {event.host.charAt(0)}
            </div>
            <span className="text-xs text-gray-400">Hosted by <span className="text-gray-300">{event.host}</span></span>
          </div>
        )}
      </div>
      
      <div className="border-t border-[#23232A] p-4 flex items-center justify-between">
        {event.attendees !== undefined && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Users className="h-3.5 w-3.5" />
            <span>{event.attendees} attending</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#23232A] rounded transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#23232A] rounded transition-colors">
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            onClick={handleRSVP}
            disabled={isPastEvent}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              isPastEvent
                ? "bg-[#23232A] text-gray-500 cursor-not-allowed"
                : rsvp 
                  ? "bg-green-600/20 text-green-400 border border-green-600/50" 
                  : "bg-purple-600 hover:bg-purple-700 text-white"
            } transition-colors`}
          >
            {isPastEvent ? "Ended" : rsvp ? "Going" : "RSVP"}
          </button>
        </div>
      </div>
    </div>
  );
}
