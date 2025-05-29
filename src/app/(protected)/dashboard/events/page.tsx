'use client';

import { useState, useEffect } from 'react';
import EventCard from "@/components/global/event-card/EventCard";
import { Clock, Calendar, Search, Plus, Filter, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EventsPage() {
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    router.push('/dashboard/events/create');
  };

  const filteredEvents = events.filter(event => {
    // Filter by search query
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Filter by event type
    const eventDate = new Date(event.datetime);
    const today = new Date();
    if (filterType === 'upcoming' && eventDate < today) {
      return false;
    }
    if (filterType === 'past' && eventDate >= today) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Events</h1>
            <p className="text-gray-400 mt-1">Find and manage upcoming community events</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-[#1E1E24] px-4 py-2 rounded-lg border border-[#2D2D35]">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">May 18, 2025</span>
            </div>
            <button 
              onClick={handleCreateEvent}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Create Event</span>
            </button>
          </div>
        </div>
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-400">
          <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-white">Events</span>
        </nav>
      </div>

      {/* Filters */}
      <div className="bg-[#18181b] border border-[#23232A] p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filterType === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              All Events
            </button>
            <button 
              onClick={() => setFilterType('upcoming')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filterType === 'upcoming' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilterType('past')}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filterType === 'past' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-[#23232A] text-gray-300 hover:bg-[#2D2D35]'
              }`}
            >
              Past Events
            </button>
            <div className="flex items-center px-3 py-1.5 bg-[#23232A] rounded-lg text-gray-300 hover:bg-[#2D2D35] transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm">More Filters</span>
            </div>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 py-1.5 px-3 pr-8 bg-[#23232A] border border-[#2D2D35] rounded-lg text-sm text-gray-300 focus:outline-none focus:border-purple-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full bg-[#18181b] border border-[#23232A] p-8 rounded-xl text-center">
            <p className="text-gray-400">Loading events...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id || event.id} event={event} />
          ))
        ) : (
          <div className="col-span-full bg-[#18181b] border border-[#23232A] p-8 rounded-xl text-center">
            <p className="text-gray-400">No events found. Try adjusting your filters or create a new event.</p>
          </div>
        )}
      </div>
    </div>
  );
}
