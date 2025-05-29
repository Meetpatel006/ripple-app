import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  await connectToDatabase();
  const events = await Event.find({}).sort({ datetime: 1 });
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const data = await req.json();
  // If no thumbnail is provided, generate a random picsum.photos image
  if (!data.thumbnail) {
    data.thumbnail = `https://picsum.photos/seed/${Date.now()}/600/400`;
  }
  // Add random attendees if not provided
  if (typeof data.attendees !== 'number') {
    data.attendees = Math.floor(Math.random() * 91) + 10; // 10-100
  }
  const event = await Event.create(data);
  return NextResponse.json(event, { status: 201 });
}

export async function PATCH() {
  await connectToDatabase();
  const events = await Event.find({ $or: [ { thumbnail: { $exists: false } }, { thumbnail: /unsplash/ } ] });
  for (const event of events) {
    const newThumbnail = `https://picsum.photos/seed/${event._id}/600/400`;
    event.thumbnail = newThumbnail;
    await event.save();
  }
  return NextResponse.json({ updated: events.length });
} 