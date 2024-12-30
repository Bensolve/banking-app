import mongoose, { ConnectOptions } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const options: ConnectOptions = {
      maxPoolSize: 100, // Pool up to 100 connections
      serverSelectionTimeoutMS: 5000, // Short timeout for failover
      socketTimeoutMS: 45000, // Socket timeout to handle idle connections
      family: 4, // Use IPv4 for faster connections
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
