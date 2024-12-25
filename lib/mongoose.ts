import mongoose from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')
    if (!cached.promise) {
      console.log('Creating new MongoDB connection...');
      cached.promise = mongoose
        .connect(MONGODB_URI)
        .then((mongoose) => {
          console.log('MongoDB connected successfully');
          return mongoose;
        })
        .catch((err) => {
          console.error('MongoDB connection error:', err);
          throw err;
        });

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI)

  cached.conn = await cached.promise

  return cached.conn
  }
}