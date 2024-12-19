import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

// Define the cached connection interface
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Augment the global object for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongoose || { conn: null, promise: null };

async function connectToDatabase(): Promise<typeof mongoose> {
  // Return cached connection if it exists
  if (cached.conn) {
    console.log('Using cached MongoDB connection.');
    return cached.conn;
  }

  // Create a new connection if not cached
  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const start = Date.now();

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'banking-app', // Specify database name
        bufferCommands: false, // Disable command buffering
      })
      .then((mongooseInstance) => {
        console.log(`Connected to MongoDB in ${Date.now() - start}ms`);
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  // Wait for the promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

// Cache the connection for development environments
if (process.env.NODE_ENV !== 'production') {
  global.mongoose = cached;
}

export default connectToDatabase;
