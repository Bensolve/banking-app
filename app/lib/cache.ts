import Session from '@/app/lib/models/Session';
import { Document } from 'mongoose';

// Define a type for session data based on the Session model
type SessionData = Document & {
  sessionId: string;
  userId: string;
  expiresAt: Date;
};

const sessionCache = new Map<string, SessionData | null>(); // Explicitly typed cache

export async function getSession(sessionId: string): Promise<SessionData | null> {
  // Check if the session is in the cache
  if (sessionCache.has(sessionId)) {
    return sessionCache.get(sessionId) || null; // Return the cached session
  }

  // Query the database for the session
  const session = await Session.findOne({ sessionId }).exec(); // Use `.exec()` for better typing in Mongoose
  if (session) {
    sessionCache.set(sessionId, session); // Cache the session for future use
  }

  return session;
}
