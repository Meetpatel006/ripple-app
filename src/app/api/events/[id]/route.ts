import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = context.params;
  const event = await Event.findById(id);
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = context.params;
  const data = await req.json();
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  return NextResponse.json(event);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = context.params;
  const event = await Event.findByIdAndDelete(id);
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  return NextResponse.json({ message: 'Event deleted' });
} 