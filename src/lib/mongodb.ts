import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_URI = 'mongodb+srv://meetpatel:meetpatel2006@ripple-app-data.xcmyv3v.mongodb.net/?retryWrites=true&w=majority&appName=ripple-app-data'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
} 