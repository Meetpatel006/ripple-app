import mongoose, { Schema, models } from 'mongoose';

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  datetime: { type: String, required: true },
  capacity: { type: Number },
  isPublic: { type: Boolean, default: true },
  image: { type: String },
  attendees: { type: Number, default: 0 },
  host: { type: String },
  thumbnail: { type: String },
});

export default models.Event || mongoose.model('Event', EventSchema); 