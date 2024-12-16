// models/Session.js
import mongoose from 'mongoose';

// Define the schema for a session
const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },  // Unique identifier for the session
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User
  createdAt: { type: Date, default: Date.now },  // Session creation time
  expiresAt: { type: Date, required: true },  // Expiration time for the session
});

// Create the session model based on the schema
const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
