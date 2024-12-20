import mongoose from 'mongoose';

// Ensure MongoDB URI is provided
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
  if (cached.conn) {
    console.log('Using cached MongoDB connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    const start = Date.now();

    // Connect to MongoDB
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'banking-app', // Specify the database name
        bufferCommands: false, // Prevent command buffering
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

  cached.conn = await cached.promise;
  return cached.conn;
}

// Prewarm connection during application startup
connectToDatabase()
  .then(() => console.log('Prewarmed MongoDB connection.'))
  .catch((err) => console.error('Error prewarming MongoDB:', err));

// Cache the connection in development environments
if (process.env.NODE_ENV !== 'production') {
  global.mongoose = cached;
}

export default connectToDatabase;
